import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";

import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfilePosts from "../components/ProfilePosts";
import LoadingPage from "../../shared/components/LoadingPage";

import "../styles/profile.scss";

const Profile = () => {
  const [data, setData] = useState(null);

  const { loading, handleGetMe } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await handleGetMe();
      if (!res) return;
      setData(res);
    };
    fetchUser();
  }, [handleGetMe]);

  if (loading || !data) {
    return (
        <LoadingPage />
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-page-section">
        <ProfileHeader user={data.user} />
        <ProfileStats
          postCount={data.postCount}
          followerCount={data.followerCount}
          followingCount={data.followingCount}
        />
        <ProfilePosts posts={data.posts} />
      </section>
    </main>
  );
};

export default Profile;
