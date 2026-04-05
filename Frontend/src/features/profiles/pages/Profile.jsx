import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfilePosts from "../components/ProfilePosts";
import "../styles/profile.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import Nav from "../../shared/components/Nav";
import BottomNav from "../../shared/components/BottomNav";

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
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <Nav />
      <section className="profile-page-section">
        <ProfileHeader user={data.user} />
        <ProfileStats
          postCount={data.postCount}
          followerCount={data.followerCount}
          followingCount={data.followingCount}
        />
        <ProfilePosts posts={data.posts} />
      </section>
      <BottomNav />
    </main>
  );
};

export default Profile;
