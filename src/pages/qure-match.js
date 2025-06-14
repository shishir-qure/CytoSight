import React from "react";

const QureMatch = () => {
  // Redirect to Molecular Match
  React.useEffect(() => {
    window.location.href =
      "https://accounts.molecularmatch.com/signin?continue=https://app.molecularmatch.com";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Qure Match</h1>
      <p className="text-lg text-gray-600">Redirecting to Molecular Match...</p>
    </div>
  );
};

export default QureMatch;
