import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import fpPromise from "@fingerprintjs/fingerprintjs";

interface WelcomeGiftContextType {
  isDiscountActive: boolean;
  discountPercentage: number;
  discountEndTime: number | null;
  hasClaimed: boolean;
  claimOffer: (email: string, name: string) => Promise<{ success: boolean; message: string }>;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  showGiftBox: boolean;
}

const WelcomeGiftContext = createContext<WelcomeGiftContextType | undefined>(undefined);

export const useWelcomeGift = () => {
  const context = useContext(WelcomeGiftContext);
  if (!context) {
    throw new Error("useWelcomeGift must be used within a WelcomeGiftProvider");
  }
  return context;
};

// Mock Firebase Database Service
const mockFirebaseDb = {
  checkClaimed: async (email: string, deviceId: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // In a real app, this would query Firebase:
    // const snapshot = await getDocs(query(collection(db, "claims"), or(where("email", "==", email), where("deviceId", "==", deviceId))));
    // return !snapshot.empty;

    // For this demo, we'll use localStorage to simulate the global database
    const claims = JSON.parse(localStorage.getItem("mock_firebase_claims") || "[]");
    return claims.some((c: any) => c.email === email || c.deviceId === deviceId);
  },
  saveClaim: async (email: string, deviceId: string, endTime: number) => {
    const claims = JSON.parse(localStorage.getItem("mock_firebase_claims") || "[]");
    claims.push({ email, deviceId, endTime, claimedAt: Date.now() });
    localStorage.setItem("mock_firebase_claims", JSON.stringify(claims));
  }
};

export const WelcomeGiftProvider = ({ children }: { children: ReactNode }) => {
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [discountEndTime, setDiscountEndTime] = useState<number | null>(null);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const discountPercentage = 50; // 50% off

  useEffect(() => {
    // Initialize FingerprintJS
    const initFingerprint = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setDeviceId(result.visitorId);
    };
    initFingerprint();

    // Check local storage for existing active discount
    const savedEndTime = localStorage.getItem("welcome_discount_end_time");
    const savedHasClaimed = localStorage.getItem("welcome_has_claimed");

    if (savedHasClaimed === "true") {
      setHasClaimed(true);
    } else {
      // Show gift box if they haven't claimed it
      setShowGiftBox(true);
    }

    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      if (endTime > Date.now()) {
        setIsDiscountActive(true);
        setDiscountEndTime(endTime);
      } else {
        // Discount expired
        setIsDiscountActive(false);
        setDiscountEndTime(null);
        localStorage.removeItem("welcome_discount_end_time");
      }
    }
  }, []);

  useEffect(() => {
    // Timer to auto-disable discount when time is up
    if (isDiscountActive && discountEndTime) {
      const timeRemaining = discountEndTime - Date.now();
      if (timeRemaining > 0) {
        const timerId = setTimeout(() => {
          setIsDiscountActive(false);
          setDiscountEndTime(null);
          localStorage.removeItem("welcome_discount_end_time");
        }, timeRemaining);
        return () => clearTimeout(timerId);
      } else {
        setIsDiscountActive(false);
        setDiscountEndTime(null);
        localStorage.removeItem("welcome_discount_end_time");
      }
    }
  }, [isDiscountActive, discountEndTime]);

  const claimOffer = async (email: string, name: string) => {
    if (!deviceId) {
      return { success: false, message: "Could not identify device. Please try again." };
    }

    try {
      // 1. Check if already claimed (Firebase check)
      const isAlreadyClaimed = await mockFirebaseDb.checkClaimed(email, deviceId);

      if (isAlreadyClaimed) {
        return { success: false, message: "Offer already claimed on this device." };
      }

      // 2. Calculate end time (2 hours from now)
      const endTime = Date.now() + 2 * 60 * 60 * 1000;

      // 3. Save to "Firebase"
      await mockFirebaseDb.saveClaim(email, deviceId, endTime);

      // 4. Update local state
      setIsDiscountActive(true);
      setDiscountEndTime(endTime);
      setHasClaimed(true);
      setShowGiftBox(false);
      setIsModalOpen(false);

      // 5. Persist to localStorage
      localStorage.setItem("welcome_discount_end_time", endTime.toString());
      localStorage.setItem("welcome_has_claimed", "true");

      return { success: true, message: "Offer claimed successfully!" };
    } catch (error) {
      console.error("Error claiming offer:", error);
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  return (
    <WelcomeGiftContext.Provider
      value={{
        isDiscountActive,
        discountPercentage,
        discountEndTime,
        hasClaimed,
        claimOffer,
        isModalOpen,
        setIsModalOpen,
        showGiftBox
      }}
    >
      {children}
    </WelcomeGiftContext.Provider>
  );
};
