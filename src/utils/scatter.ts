import { CardPosition } from '../types';

/**
 * Distributes cards across a 2D bounding area ensuring cards do not severely overlap
 * while maintaining a natural, scattered appearance.
 */
export function generateScatteredPositions(
  soundIds: string[],
  aspectRatio: number = 16 / 9
): CardPosition[] {
  const count = soundIds.length;
  if (count === 0) return [];

  const positions: CardPosition[] = [];

  // Decide grid cells based on count and aspect ratio to ensure room
  const cols = Math.max(2, Math.ceil(Math.sqrt(count * aspectRatio)));
  const rows = Math.ceil(count / cols);

  // Available area percentage margins
  const minX = 4;
  const maxX = 92;
  const minY = 6;
  const maxY = 90;

  const cellWidth = (maxX - minX) / cols;
  const cellHeight = (maxY - minY) / rows;

  // Create list of grid slots and shuffle them
  const slots: Array<{ r: number; c: number }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      slots.push({ r, c });
    }
  }

  // Fisher-Yates shuffle
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  // Place cards into jittered slots
  for (let i = 0; i < count; i++) {
    const slot = slots[i % slots.length];

    // Jitter within the cell (up to 40% margin)
    const jitterX = (Math.random() - 0.5) * (cellWidth * 0.5);
    const jitterY = (Math.random() - 0.5) * (cellHeight * 0.5);

    const x = Math.min(maxX, Math.max(minX, minX + (slot.c + 0.5) * cellWidth + jitterX));
    const y = Math.min(maxY, Math.max(minY, minY + (slot.r + 0.5) * cellHeight + jitterY));

    // Slight organic tilt
    const rotation = (Math.random() - 0.5) * 6;

    positions.push({
      soundId: soundIds[i],
      xPercent: x,
      yPercent: y,
      rotationDeg: Math.round(rotation * 10) / 10
    });
  }

  return positions;
}
