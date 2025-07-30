import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <Box className="bg-[rgb(0,78,150)] text-white py-2 ">
        <Box className="px-5 w-full flex justify-between items-center">
          <Typography variant="body2" className="text-center">
            Copyright The Federal Bank Limited.
          </Typography>
          <Box>
            <div className="flex items-center gap-4">
              <Link
                target="_blank"
                href="https://www.federalbank.co.in/"
                color="inherit"
                className="mx-2"
              >
                Go to Federal Bank Website
              </Link>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LoginFooter;
