// components/LoginRequiredPopup.jsx
"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import usePopupStore from "@/store/popupStore";

const LoginRequiredPopup = () => {
  const { showLoginPopup, closeLoginPopup } = usePopupStore();
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    closeLoginPopup();
    navigate("/login");
  };

  const handleHome = () =>{
    closeLoginPopup();
    navigate("/");
  }

  return (
    <Dialog open={showLoginPopup} onOpenChange={handleHome}>
      <DialogContent className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-red-600">
            Login Required
          </DialogTitle>
        </DialogHeader>
        <p className="text-center text-gray-600 mt-2">
          You must be logged in to use this feature.
        </p>
        <div className="flex justify-center mt-6 gap-4">
          <Button variant="outline" onClick={handleHome} className="px-6 py-2 rounded-md border-gray-500 hover:border-gray-700">
            Close
          </Button>
          <Button 
            onClick={handleGoToLogin}
            className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Go to Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRequiredPopup;
