import { Card } from '@/components/Card';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <div className="w-full h-full max-w-[1220px] px-5 sm:px-10 my-10 mx-auto">
      <h1 className="font-semibold text-xl text-primary-900 mb-[30px] leading-5">
        {title}
      </h1>
      <Card>{children}</Card>
    </div>
  );
};
