import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="select-none">
      <div className="flex justify-between px-5 leading-8 items-center shadow-md py-3">
        <Link to="/" className="space-x-[1px] cursor-pointer">
          <span className="text-purple-600 text-xl font-bold tracking-wide font-mono">
            REDUX
          </span>
          <span className="text-slate-50">toolkit</span>
        </Link>
        <div>
          <Link to="add-new-post">
            <p>Add New</p>
          </Link>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
