"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCurrentDocumentSnapshot = isCurrentDocumentSnapshot;
function isCurrentDocumentSnapshot(capturedVersion, currentVersion, indexedVersion) {
    return currentVersion !== undefined &&
        capturedVersion === currentVersion &&
        indexedVersion === currentVersion;
}
//# sourceMappingURL=documentDiagnostics.js.map