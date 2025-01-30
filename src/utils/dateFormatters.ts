export const formatEventDate = (dateStart: string, dateEnd?: string) => {
  const startDate = new Date(dateStart);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!dateEnd) {
    return formatDate(startDate);
  }

  const endDate = new Date(dateEnd);
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const calculateTimeRemaining = (targetDate: string) => {
  const now = new Date();
  const target = new Date(targetDate);
  const timeDiff = target.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return {
      timeString: "Applications Closed",
      isExpired: true
    };
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    timeString: `${days}d:${hours}h:${minutes}m`,
    isExpired: false
  };
};