// Check if user has required role
export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // If user has admin role, they can access everything
    if (req.user.role?.name === 'admin') {
      return next();
    }

    if (allowedRoles.includes(req.user.role?.name)) {
      return next();
    }

    return res.status(403).json({ 
      error: 'Access denied. Insufficient permissions.' 
    });
  };
};

// Check if user has required permission
export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      // Admin has all permissions
      if (req.user.role?.name === 'admin') {
        return next();
      }

      // Check if user's role has the required permission
      if (req.user.role?.permissions?.includes(requiredPermission)) {
        return next();
      }

      return res.status(403).json({ 
        error: `Access denied. Requires ${requiredPermission} permission.` 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};