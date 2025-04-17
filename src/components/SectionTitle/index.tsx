interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <p className="text-primary-900 leading-4 font-semibold py-3 px-5 bg-primary-50 rounded-md">
      {title}
    </p>
  );
};
