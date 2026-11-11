export default function Landing() {
  return (
    <section id="landing" className="py-10 w-full">
      <div className="max-w-[1070px] w-full mx-auto px-6">
        <div>
          <div className="flex max-md:flex-col max-md:items-center max-md:text-center max-md:max-w-[540px] max-md:mx-auto">
            <div className="w-full">
              <div className="text-brand-dark text-[40px] max-md:text-[24px] font-bold mb-6">
                Gain more knowledge <br className="max-md:hidden" />
                in less time
              </div>
              <div className="text-brand-text text-[20px] font-light mb-6 leading-[1.5]">
                Great summaries for busy people,
                <br className="max-md:hidden" />
                individuals who barely have time to read,
                <br className="max-md:hidden" />
                and even people who don’t like to read.
              </div>
              <button className="bg-brand-primary hover:bg-brand-primary-hover active:translate-y-[1px] text-brand-dark w-full h-[40px] rounded-[4px] text-[16px] transition-colors duration-200 flex items-center justify-center min-w-[180px] max-w-[300px] max-md:mx-auto">
                Login
              </button>
            </div>
            <figure className="w-full flex justify-end max-md:hidden">
              <img
                src="/assets/landing.png"
                alt="landing"
                className="w-full h-full max-w-[400px]"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}