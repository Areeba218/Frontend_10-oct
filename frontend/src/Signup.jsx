import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://frontend-10oct.onrender.com/user/register",
        {
          username: username,
          email: email,
          password: password
        }
      );

      console.log(response);

      localStorage.setItem(
        "username",
        response.data.username
      );

      setMessage(
        "Signup successful! Please check your email and verify your account before login."
      );

      setSignupSuccess(true);
      setShowPopup(true);

      setUsername('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.log("Signup error:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again."
      );

      setSignupSuccess(false);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);

    if (signupSuccess) {
      navigate("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex min-h-screen items-center justify-center p-4 bg-[#32a89d]">

          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Register to your account</CardTitle>

              <CardDescription>
                Enter your details to create an account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>

                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>

                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>

              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>

      <Dialog
        open={showPopup}
        onOpenChange={(open) => {
          if (!open) {
            handlePopupClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {signupSuccess ? "Signup Successful" : "Signup"}
            </DialogTitle>

            <DialogDescription>
              {message}
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={handlePopupClose}
            className="w-full"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Signup;