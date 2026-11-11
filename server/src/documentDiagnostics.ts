export function isCurrentDocumentSnapshot(
  capturedVersion: number,
  currentVersion: number | undefined,
  indexedVersion: number | undefined
): boolean {
  return currentVersion !== undefined &&
    capturedVersion === currentVersion &&
    indexedVersion === currentVersion;
}
