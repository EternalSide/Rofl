import { ChildrenProps } from "@/types";

const AuthLayout = ({ children }: ChildrenProps) => {
  return <div className="flex-center min-h-screen bg-auth-light dark:bg-auth-dark">{children}</div>;
};
export default AuthLayout;
