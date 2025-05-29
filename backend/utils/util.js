
// utils/calculateRemainingPlanDays.js

export function calculateRemainingPlanDays(user) {
  if (!user?.isPlanActive || !user?.planStartDate || !user?.planDuration) {
    return 0;
  }

  const now = new Date();
  const start = new Date(user.planStartDate);
  const elapsedMs = now.getTime() - start.getTime();
  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

  const remainingDays = user.planDuration - elapsedDays;
  return remainingDays > 0 ? remainingDays : 0;
}
