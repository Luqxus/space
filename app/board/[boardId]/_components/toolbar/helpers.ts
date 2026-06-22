import { CanvasPermissions } from '../../types/permissions';

export function hasEditPermissions(canvasPermission: CanvasPermissions) {
  const boardPermissions = [CanvasPermissions.READ_WRITE, CanvasPermissions.ADMIN];
  return boardPermissions.includes(canvasPermission);
}


