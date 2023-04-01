export default function UserCard({ user }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={`http://localhost:9999/${user.profileImage.path}`}
        alt={user.name}
      />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.email}</p>
      </div>

      <div className="card-body">
        <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
}
