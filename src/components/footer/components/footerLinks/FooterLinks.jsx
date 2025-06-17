export default function FooterLinks({ links , titile }) {
  return (
    <div className="ele-center justify-start lg:justify-center">
      <div>
        <h4 className="text-[1.2rem] font-medium mb-2 ">{titile}</h4>
        <ul className="flex flex-col gap-2 ml-5 min-h-10">
          {links.map((link) => (
            <li
              key={link}
              className="list-disc hover:text-[#ff1e1e] transition-all duration-200  cursor-pointer"
            >
              <a
                href=""
                className=" inline-block hover:translate-y-[-0.4rem] transition-transform duration-400 ease-linear "
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
