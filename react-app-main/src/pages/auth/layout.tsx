import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../components/context/use-auth";

export function AuthLayout() {
  const { user, ready } = useAuth();
  if (ready && user) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  return (
    <main className="auth-split">
      <aside className="auth-photo" aria-label="Food photography">
        <div className="auth-photo-note">
          <p className="mb-3 text-xs uppercase tracking-widest" style={{color:"#dfad7f"}}>A little inspiration for your table</p>
          <blockquote>“Good food brings people together. Keep the recipes worth sharing.”</blockquote>
          <p className="mt-3 text-sm">Your kitchen, your collection, your story.</p>
        </div>
      </aside>
      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-brandbar">
            <Link className="auth-brand" to="/auth/login">Recipe<span>Book.</span></Link>
          </div>
          {ready ? <Outlet /> : null}
          <p className="mt-10 text-center text-xs">© Recipe Book · Made for the meals you love</p>
        </div>
      </section>
    </main>
  );
}
