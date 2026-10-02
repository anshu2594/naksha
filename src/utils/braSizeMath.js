/**
 * Accurate Bra Size Calculation Algorithm
 * Based on international standard sizing (Underbust & Fullest Bust)
 */

export function calculateBraSize(underbustInches, bustInches) {
  const underbust = parseFloat(underbustInches);
  const bust = parseFloat(bustInches);

  if (!underbust || !bust || bust <= underbust) {
    return null;
  }

  // Calculate Band Size
  let bandSize = Math.round(underbust);
  if (bandSize % 2 !== 0) {
    bandSize += 1; // Round up to nearest even number
  }

  // Traditional industry adjustment: if underbust is 28-29 => Band 32; if underbust 30-31 => Band 34
  // Direct underbust band conversion matrix:
  let finalBand;
  if (underbust < 27) finalBand = 28;
  else if (underbust < 29) finalBand = 30;
  else if (underbust < 31) finalBand = 32;
  else if (underbust < 33) finalBand = 34;
  else if (underbust < 35) finalBand = 36;
  else if (underbust < 37) finalBand = 38;
  else if (underbust < 39) finalBand = 40;
  else if (underbust < 42) finalBand = 42;
  else finalBand = 44;

  // Cup Size calculation: Difference between Bust and Band
  const diff = bust - finalBand;

  let cupLetter = 'B'; // default fallback
  if (diff <= 0.5) cupLetter = 'AA';
  else if (diff <= 1.5) cupLetter = 'A';
  else if (diff <= 2.5) cupLetter = 'B';
  else if (diff <= 3.5) cupLetter = 'C';
  else if (diff <= 4.5) cupLetter = 'D';
  else if (diff <= 5.5) cupLetter = 'DD';
  else if (diff <= 6.5) cupLetter = 'E';
  else if (diff <= 7.5) cupLetter = 'F';
  else cupLetter = 'G';

  // Sister sizes (loose band + smaller cup, tight band + larger cup)
  const sisterTight = `${finalBand - 2}${getNextCup(cupLetter, 1)}`;
  const sisterLoose = `${finalBand + 2}${getNextCup(cupLetter, -1)}`;

  return {
    bandSize: finalBand,
    cupLetter,
    fullSize: `${finalBand}${cupLetter}`,
    sisterTight: finalBand > 30 ? sisterTight : null,
    sisterLoose: finalBand < 42 ? sisterLoose : null,
    notes: 'For optimal comfort, bras with stretch fabrics will mold comfortably around this calculated size.'
  };
}

function getNextCup(cup, offset) {
  const cups = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G'];
  const idx = cups.indexOf(cup);
  if (idx === -1) return cup;
  const newIdx = idx + offset;
  if (newIdx >= 0 && newIdx < cups.length) {
    return cups[newIdx];
  }
  return cup;
}
