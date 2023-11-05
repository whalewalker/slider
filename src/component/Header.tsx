type HeaderProps = {
    title: string;
    description: string;
};

const Header: React.FC<HeaderProps> = ({title, description}) => {
    return (
        <header className="flex flex-col items-center w-full md:w-1/2 mx-auto mt-10 md:mt-15">
            <h2 className="my-3 text-lg md:text-xl lg:text-[1.6rem] font-medium text-[#0D0C2D]">{title}</h2>
            <p className="text-center text-gray-600 leading-6 text-sm md:text-base md:text-[14px] lg:text-base sm:text-xxs sm:leading-4">
                {description}
            </p>
        </header>
    );
};

export default Header;
