import { useCallback, useState } from "react";

export const useDisplayList = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  return {
    goToNextStep,
    goToPreviousStep,
    currentStep,
  };
};
