export function formatDate(d) {
  if (!d) return '';

  // yyyy-mm-ddT...
  // 0123457890
  return d.toISOString().slice(0, 10);
}

const ONE_DAY = 1000 * 60 * 60 * 24;

function dateToOffset(base, date) {
  return Math.floor((date.valueOf() - base.valueOf()) / ONE_DAY);
}

function offsetToDate(base, offset) {
  return new Date(base.valueOf() + offset * ONE_DAY);
}

export function stayInformationFromDates(visits, options = {}) {
  options = {
    windowSize:  180,
    maxStay:     90,
    ...options
  };

  if (!visits.length) {
    return;
  }

  visits = visits.sort((a, b) => {
    return a.entry - b.entry;
  });

  const baseDate = visits[0].entry;
  const offsets = visits.map(v => {
    return {
      entry: dateToOffset(baseDate, v.entry),
      exit:  dateToOffset(baseDate, v.exit)
    };
  });

  let { allowable, overstays } = stayInformationFromOffsets(offsets, options);

  function transformOut(obj) {
    return {
      ...obj,
      from:  obj.from !== null && offsetToDate(baseDate, obj.from),
      to:    obj.to !== null && offsetToDate(baseDate, obj.to)
    };
  }

  return {
    allowable: allowable.map(transformOut),
    overstays: overstays.map(transformOut)
  };
}

function stayInformationFromOffsets(offsets, { windowSize, maxStay }) {
  // This makes lookup much easier
  let presence = []; // presence at offset
  for (let i = 0; i < offsets.length; ++i) {
    let visit = offsets[i];
    for (let j = visit.entry; j <= visit.exit; ++j) {
      presence[j] = true;
    }
  }

  let remaining = maxStay;
  let overstays = [];
  let allowable = [];

  let day;
  let overstayStart = null;

  for (day = 0; day < presence.length; ++day) {
    if (presence[day - windowSize]) {
      ++remaining;
      if (remaining === 0) {
        if (overstayStart !== null) {
          overstays.push({
            from: overstayStart,
            to:   day - 1
          })
          overstayStart = null;
        }
      }
    }
    if (presence[day]) {
      --remaining;
      if (remaining < 0) {
        if (overstayStart === null) {
          overstayStart = day;
        }
      }
    }
  }

  // There's definitely a more efficient way to calculate this
  // rather than stepping through every single day, but this is
  // the simplest method I know. Might reimplement later.

  // Find the start of the first incline
  while (remaining <= 0) {
    if (presence[day - windowSize]) {
      if (remaining === 0) {
        if (overstayStart !== null) {
          overstays.push({
            from: overstayStart,
            to: day - 1
          })
          overstayStart = null;
        }
        break;
      }
      ++remaining;
    }
    ++day;
  }

  // `day` is now at the first day after existing visits where a
  // return is allowable

  let firstDay = day;
  do {
    // The idea: An "incline" and its following plateau can be considered a
    // block of time where it's possible to return to the Schengen area
    // for the maximum `remaining` value seen on the plateau

    // Capture incline
    while (presence[day - windowSize]) {
      ++remaining;
      ++day;
    }

    // And plateau
    if (remaining !== maxStay) { // happily, we've reached our termination case
      while (!presence[day - windowSize]) {
        ++day;
      }
    }

    allowable.push({
      from: firstDay,
      to: remaining !== maxStay ? day - 1 : null,
      maxStay: remaining
    });

    firstDay = day;
  } while (remaining < maxStay);

  return { allowable, overstays };
}
