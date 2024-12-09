export function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export function relativeTimeFormat(timestamp) {
  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'min', seconds: 60 },
    { label: 'sec', seconds: 1 }
  ];

  const calculateTimeDifference = (time) => {
    for (let { label, seconds } of units) {
      const interval = Math.floor(time / seconds);
      if (interval >= 1) {
        return {
          interval: interval,
          unit: label
        };
      }
    }
    return {
      interval: 0,
      unit: ''
    };
  };

  const timeAgo = (date) => {
    const time = Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    );
    const { interval, unit } = calculateTimeDifference(time);

    // Return just now if less than 60 seconds
    if (interval < 60 && unit == units[6].label) return `Just now`;
    
    if (interval <= 0) return `Just now`;

    const suffix = interval === 1 ? '' : 's';
    return `${interval} ${unit}${suffix} ago`;
  };

  return timeAgo(timestamp)
}

export function timeFormat(timestamp) {

  if (!timestamp) return '';

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'min', seconds: 60 },
    { label: 'sec', seconds: 1 }
  ];

  const calculateTimeDifference = (time) => {
    for (let { label, seconds } of units) {
      const interval = Math.floor(time / seconds);
      if (interval >= 1) {
        return {
          interval: interval,
          unit: label
        };
      }
    }
    return {
      interval: 0,
      unit: units[6].label
    };
  };

  const timeAgo = (date) => {
    const time = Math.floor(
      (new Date().valueOf() - new Date(date).valueOf()) / 1000
    );
    const { interval, unit } = calculateTimeDifference(time);

    if (unit == units[6].label || unit == units[5].label || unit == units[4].label) {
      const def = new Date(timestamp).toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit',
      });

      return def;
    } else if (unit == units[3].label) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return days[new Date(timestamp).getDay()];
    }

    const suffix = interval === 1 ? '' : 's';
    return `${interval} ${unit}${suffix}`;
  };

  return timeAgo(timestamp)
}
