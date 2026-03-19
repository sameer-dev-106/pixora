import { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfilePosts from "../components/ProfilePosts";
import "../styles/getme.scss";
import { useAuth } from "../hooks/useAuth";

const GetMe = () => {
  const [data, setData] = useState(null);

  const { loading, handleGetMe } = useAuth();

  const fetchUser = async () => {
    const res = await handleGetMe();
    setData(res);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading || !data) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
  );
  }

  return (
    <main className="profile-page">
      <ProfileHeader user={data.user} />
      <ProfileStats
        postCount={data.postCount}
        followerCount={data.followerCount}
        followingCount={data.followingCount}
      />
      <ProfilePosts posts={data.posts} />
    </main>
  );
};

export default GetMe;
