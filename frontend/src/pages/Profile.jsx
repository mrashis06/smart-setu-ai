import React from "react";

const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Basic vendor profile details:</p>

      <div className="grid gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <strong>Name:</strong> Rajesh Kumar
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <strong>Business Type:</strong> Street Food Vendor
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <strong>City:</strong> Kolkata
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <strong>Current Credit Score:</strong> 720
        </div>
      </div>
    </div>
  );
};

export default Profile;
