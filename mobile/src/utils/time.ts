export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

export const formatDateTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

export const getTimeUntil = (targetDate: Date): string => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff < 0) return 'Ya pasó';

  const minutes = Math.floor(diff / 60000);
  return formatTime(minutes);
};
