import HeroSection from "./HeroSection"
import HomeEventsAndHackathonsSection from "./HomeEventsAndHackathonsSection"


const HomePage = () => {
  return (
    <div className="w-screen  bg-black">
      <HeroSection/>
      <HomeEventsAndHackathonsSection/>
    </div>
  )
}

export default HomePage
