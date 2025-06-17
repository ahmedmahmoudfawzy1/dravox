import aboutImage from "../../assets/images/about.webp";

export default function AboutComponent() {
  return (
    <section className="min-height-[1000px]">
      <div className="container pt-[8rem]">
        <div>
          <h2 className="w-full text-[4rem] text-center font-bold mb-8">
            About US
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            <div>
              <img
                src={aboutImage}
                alt="About"
                className="w-full h-auto rounded-[8px]"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-evenly">
              <h2 className="text-2xl font-bold mb-4 ">
                About{" "}
                <span className="sm:text-[50px] text-primary-color font-mono">
                  Dravox
                </span>{" "}
                Gaming
              </h2>
              <p className="mb-4">
                Welcome to Dravox, your one-stop shop for everything you need to
                elevate your gaming experience!
              </p>
              <p>
                We are a passionate group of gamers dedicated to providing
                Egyptian gamers with high-quality, competitively-priced
                accessories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
