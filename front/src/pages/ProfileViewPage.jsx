import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";
import { viewProfile } from "../axios/requests";
import LoadingBook from "../components/LoadingBook";
function ProfileViewPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await viewProfile(userId);
        setUserData(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // Set loading to false regardless of success or error
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {loading ? <LoadingBook /> : userData && <Profile user={userData} />}
    </div>
  );
}

export default ProfileViewPage;
