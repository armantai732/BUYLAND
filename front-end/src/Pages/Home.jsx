import React from 'react'
import Hero from '../components/Hero'
import PopularLands from '../components/PopularLands'
import LandCategories from '../components/LandCategories'
import WhyChooseUs from '../components/WhyChooseUs'
import ExploreNearYou from '../components/ExploreNearYou'

function Home() {
    return (
        <div>
            <Hero />
            <PopularLands />
            <LandCategories />
            <ExploreNearYou />
            <WhyChooseUs />
        </div>
    )
}

export default Home
