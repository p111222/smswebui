import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Box,
  Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ListIcon from "@mui/icons-material/List";

const UserDetailsModal = ({ user, open, onClose }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle className="flex justify-between items-center bg-gradient-to-r from-[rgb(100,15,10)] to-[rgb(180,30,20)] text-white">
        <Typography variant="h6" fontWeight="medium">User Profile</Typography>
        <IconButton 
          onClick={onClose} 
          className="!text-white hover:!bg-white/10"
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className="!p-0">
        <Box className="flex flex-col items-center pt-6 pb-4 bg-gray-50">
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'rgb(100,15,10)',
              fontSize: '2rem',
              mb: 2
            }}
          >
            {getInitials(user.userName)}
          </Avatar>
          <Typography variant="h6" fontWeight="medium" className="!text-gray-800">
            {user.userName}
          </Typography>
          <Chip 
            label={user.userType} 
            size="small" 
            sx={{ 
              mt: 1,
              bgcolor: 'rgb(100,15,10,0.1)',
              color: 'rgb(100,15,10)',
              fontWeight: 'medium'
            }} 
          />
        </Box>
        
        <Divider />
        
        <Box className="p-6 space-y-4">
          <Box className="flex items-start">
            <Box className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
              <EmailIcon className="!text-gray-500" fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" className="!text-gray-500 !font-medium">
                Email Address
              </Typography>
              <Typography variant="body2" className="!text-gray-800">
                {user.userEmail}
              </Typography>
            </Box>
          </Box>
          
          <Box className="flex items-start">
            <Box className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
              <AccessTimeIcon className="!text-gray-500" fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" className="!text-gray-500 !font-medium">
                Last Login
              </Typography>
              <Typography variant="body2" className="!text-gray-800">
                {user.lastLogin}
              </Typography>
            </Box>
          </Box>
          
          <Box className="flex items-start">
            <Box className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
              <VpnKeyIcon className="!text-gray-500" fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" className="!text-gray-500 !font-medium">
                Session ID
              </Typography>
              <Typography 
                variant="body2" 
                className="!text-gray-800 !font-mono !text-sm !truncate"
                title={user.sessionId}
              >
                {user.sessionId}
              </Typography>
            </Box>
          </Box>
          
          {/* <Divider className="!my-4" /> */}
          
          <Box className="flex items-start">
            <Box className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
              <ListIcon className="!text-gray-500" fontSize="small" />
            </Box>
            <Box className="flex-1">
              <Typography variant="caption" className="!text-gray-500 !font-medium">
                Accessible Pages
              </Typography>
              <Box className="flex flex-wrap gap-2 mt-2">
                {user.pageAccess?.map((page, index) => (
                  <Chip
                    key={index}
                    label={page}
                    size="small"
                    sx={{
                      bgcolor: 'rgb(100,15,10,0.05)',
                      color: 'rgb(100,15,10)',
                      border: '1px solid rgb(100,15,10,0.2)'
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;