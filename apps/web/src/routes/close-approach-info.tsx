import { ArrowLeft, BookOpen, ExternalLink, Shield } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CloseApproachInfo() {
  const posthog = usePostHog();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={() => {
              posthog?.capture('back_to_dashboard_clicked', {
                source: 'header_link',
                from_page: 'close_approach_info'
              });
            }}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100">
              Understanding Close Approach Alerts
            </h1>
          </div>
          <p className="text-zinc-400 text-lg">
            Learn how we monitor and alert you to close approaches of Potentially Hazardous Asteroids (PHAs)
          </p>
        </div>

        {/* Hero Callout */}
        <div className="bg-blue-950/30 border-2 border-blue-700/50 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-bold text-blue-300 mb-3">
            This is NOT a Collision Warning System
          </h2>
          <p className="text-zinc-300 mb-3">
            Close Approach Alert monitors how closely Potentially Hazardous Asteroids (PHAs) approach Earth. This is <strong>not</strong> a threat assessment - we lack collision probability data for true threat evaluation (like the Torino Scale). Instead, we provide an alert system based on proximity.
          </p>
          <p className="text-zinc-300">
            <strong>Why proximity?</strong> Closer approaches mean less margin for error in orbital calculations and greater potential concern if orbit predictions change. However, NASA tracks all PHAs carefully and would alert the world to any genuine collision threats.
          </p>
        </div>

        {/* Accordion Content */}
        <Accordion
          type="multiple"
          defaultValue={["alert-levels"]}
          className="w-full"
          onValueChange={(value) => {
            // Track which sections are expanded
            if (value.length > 0) {
              posthog?.capture('info_section_expanded', {
                sections: value,
                page: 'close_approach_info'
              });
            }
          }}
        >
          {/* Section 1: Alert Levels */}
          <AccordionItem value="alert-levels" className="border-zinc-700">
            <AccordionTrigger className="text-xl font-bold text-zinc-100 hover:text-blue-400">
              Alert Levels (0-5 Scale)
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-sm text-zinc-400">
                Similar to the Torino Scale, where 0 = no hazard and higher numbers indicate closer approaches
              </p>

              <div className="space-y-4 mt-6">
                <div className="bg-green-950/20 border-2 border-green-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-green-400">0</span>
                    <h4 className="text-xl font-bold text-green-400">No PHAs Detected</h4>
                  </div>
                  <p className="text-zinc-300">
                    No potentially hazardous asteroids detected in the next 7 days.
                  </p>
                </div>

                <div className="bg-green-950/20 border-2 border-green-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-green-400">1</span>
                    <h4 className="text-xl font-bold text-green-400">ROUTINE</h4>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">
                    <strong className="text-green-300">Distance:</strong> &gt;0.1 AU (&gt;15M km)
                  </p>
                  <p className="text-zinc-300">
                    Routine monitoring. Very distant approach with no special concern.
                  </p>
                </div>

                <div className="bg-blue-950/20 border-2 border-blue-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-blue-400">2</span>
                    <h4 className="text-xl font-bold text-blue-400">TRACKED</h4>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">
                    <strong className="text-blue-300">Distance:</strong> 0.05-0.1 AU (7.5M-15M km)
                  </p>
                  <p className="text-zinc-300">
                    Beyond NASA's threshold but still being tracked. Safe distance but monitored.
                  </p>
                </div>

                <div className="bg-yellow-950/20 border-2 border-yellow-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-yellow-400">3</span>
                    <h4 className="text-xl font-bold text-yellow-400">NOTABLE</h4>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">
                    <strong className="text-yellow-300">Distance:</strong> 0.01-0.05 AU (1.5M-7.5M km)
                  </p>
                  <p className="text-zinc-300">
                    Within NASA's PHA threshold (0.05 AU). Close enough to warrant monitoring by astronomers.
                  </p>
                </div>

                <div className="bg-orange-950/20 border-2 border-orange-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-orange-400">4</span>
                    <h4 className="text-xl font-bold text-orange-400">NOTEWORTHY</h4>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">
                    <strong className="text-orange-300">Distance:</strong> 0.002-0.01 AU (300k-1.5M km)
                  </p>
                  <p className="text-zinc-300">
                    Very close approach worth paying attention to. Within 4x the distance to the Moon.
                  </p>
                </div>

                <div className="bg-orange-950/20 border-2 border-orange-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-orange-400">5</span>
                    <h4 className="text-xl font-bold text-orange-400">NOTEWORTHY</h4>
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">
                    <strong className="text-orange-300">Distance:</strong> ≤0.002 AU (~300k km)
                  </p>
                  <p className="text-zinc-300">
                    Extremely close approach. Closer than the Moon's orbit. Warrants significant attention.
                  </p>
                </div>
              </div>

              <div className="bg-blue-950/20 border border-blue-700/50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Important Context
                </h4>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span><strong>No Immediate Danger:</strong> This dashboard tracks recent close approaches. NASA actively monitors all potential threats years in advance.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span><strong>PHAs Are Common:</strong> Being classified as a PHA doesn't mean it will impact Earth - it means it requires tracking.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span><strong>Professional Monitoring:</strong> NASA's Center for Near-Earth Object Studies (CNEOS) tracks all potential threats with sophisticated models.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span><strong>Advanced Warning:</strong> Any genuine impact threat would be detected years or decades in advance, allowing for mitigation strategies.</span>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 2: Size Classifications */}
          <AccordionItem value="size-classes" className="border-zinc-700">
            <AccordionTrigger className="text-xl font-bold text-zinc-100 hover:text-blue-400">
              NASA's Asteroid Classification by Size
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-zinc-400">
                Understanding the potential impact of asteroids based on their size and historical examples.
              </p>

              <div className="space-y-4 mt-6">
                <div className="bg-red-950/20 border-2 border-red-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🔴</span>
                    <h4 className="text-xl font-bold text-red-400">1,000m+ (1km+)</h4>
                  </div>
                  <p className="text-lg font-semibold text-red-300 mb-3">City Destroyer / Regional Impact</p>
                  <div className="space-y-2 text-zinc-300">
                    <p><strong className="text-red-200">Example:</strong> Chicxulub (10km) - Dinosaur extinction event</p>
                    <p><strong className="text-red-200">Frequency:</strong> ~1 per million years</p>
                  </div>
                </div>

                <div className="bg-orange-950/20 border-2 border-orange-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🟠</span>
                    <h4 className="text-xl font-bold text-orange-400">500m - 1,000m</h4>
                  </div>
                  <p className="text-lg font-semibold text-orange-300 mb-3">Regional Devastation</p>
                  <div className="space-y-2 text-zinc-300">
                    <p><strong className="text-orange-200">Example:</strong> Tunguska-type event at scale</p>
                    <p><strong className="text-orange-200">Frequency:</strong> ~1 per 10,000 years</p>
                  </div>
                </div>

                <div className="bg-yellow-950/20 border-2 border-yellow-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🟡</span>
                    <h4 className="text-xl font-bold text-yellow-400">140m - 500m</h4>
                  </div>
                  <p className="text-lg font-semibold text-yellow-300 mb-3">Local/Regional Damage</p>
                  <div className="space-y-2 text-zinc-300">
                    <p><strong className="text-yellow-200">Note:</strong> NASA's PHA threshold</p>
                    <p><strong className="text-yellow-200">Frequency:</strong> ~1 per 1,000 years</p>
                  </div>
                </div>

                <div className="bg-green-950/20 border-2 border-green-700/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🟢</span>
                    <h4 className="text-xl font-bold text-green-400">25m - 140m</h4>
                  </div>
                  <p className="text-lg font-semibold text-green-300 mb-3">Local Damage / Airburst</p>
                  <div className="space-y-2 text-zinc-300">
                    <p><strong className="text-green-200">Example:</strong> Chelyabinsk meteor (20m, 2013)</p>
                    <p><strong className="text-green-200">Frequency:</strong> ~1 per 100 years</p>
                  </div>
                </div>

                <div className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">⚪</span>
                    <h4 className="text-xl font-bold text-zinc-400">&lt;25m</h4>
                  </div>
                  <p className="text-lg font-semibold text-zinc-300 mb-3">Usually Burns Up in Atmosphere</p>
                  <div className="space-y-2 text-zinc-300">
                    <p><strong className="text-zinc-200">Note:</strong> Most meteors we see</p>
                    <p><strong className="text-zinc-200">Frequency:</strong> Daily</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 3: Distance Reference */}
          <AccordionItem value="distance-ref" className="border-zinc-700">
            <AccordionTrigger className="text-xl font-bold text-zinc-100 hover:text-blue-400">
              Astronomical Unit (AU) Reference
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-zinc-400">
                Understanding the distances involved in asteroid approaches.
              </p>

              <div className="bg-blue-950/30 border-2 border-blue-700/50 p-6 rounded-lg mt-6">
                <p className="text-2xl font-bold text-blue-300">
                  1 AU = ~150 million km
                </p>
                <p className="text-zinc-300 mt-2">
                  (Average Earth-Sun distance)
                </p>
              </div>

              <div className="bg-orange-950/20 border-2 border-orange-700/50 p-6 rounded-lg mt-6">
                <h4 className="text-xl font-bold text-orange-300 mb-3">
                  NASA's PHA Distance Threshold
                </h4>
                <p className="text-lg text-zinc-300">
                  <strong className="text-orange-400">0.05 AU</strong> = ~7.5 million km (~19.5x Moon distance)
                </p>
                <p className="text-sm text-zinc-400 mt-2">
                  Asteroids that come within this distance and are large enough (≥140m) are classified as Potentially Hazardous Asteroids.
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-zinc-100 mb-4">Reference Distances</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 p-5 rounded-lg">
                    <span className="font-mono text-lg font-semibold">Moon</span>
                    <span className="text-zinc-300">0.0026 AU (~384,400 km)</span>
                  </div>
                  <div className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 p-5 rounded-lg">
                    <span className="font-mono text-lg font-semibold">Close Pass</span>
                    <span className="text-zinc-300">0.01 AU (~1.5 million km)</span>
                  </div>
                  <div className="flex items-center justify-between bg-orange-950/20 border-2 border-orange-700/50 p-5 rounded-lg">
                    <span className="font-mono text-lg font-semibold text-orange-300">PHA Limit</span>
                    <span className="text-orange-400 font-bold">0.05 AU (~7.5 million km)</span>
                  </div>
                  <div className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 p-5 rounded-lg">
                    <span className="font-mono text-lg font-semibold">Safe Range</span>
                    <span className="text-zinc-300">0.10+ AU (~15+ million km)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/20 border border-blue-700/50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-300 mb-3">
                  Putting These Distances in Perspective
                </h4>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span>The Moon is our closest celestial neighbor at ~384,400 km</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span>Even a "close" pass at 0.01 AU is still ~4x the Moon's distance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span>NASA's PHA threshold (0.05 AU) is about ~19.5x the Moon's distance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span>"Close" in astronomical terms still means millions of kilometers away</span>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 4: Sources */}
          <AccordionItem value="sources" className="border-zinc-700">
            <AccordionTrigger className="text-xl font-bold text-zinc-100 hover:text-blue-400">
              Sources & Further Reading
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-zinc-400">
                Official NASA resources for learning more about asteroid tracking and planetary defense.
              </p>

              <div className="space-y-3 mt-6">
                <a
                  href="https://www.nasa.gov/planetarydefense"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    posthog?.capture('external_resource_clicked', {
                      resource: 'NASA PDCO',
                      url: 'https://www.nasa.gov/planetarydefense',
                      page: 'close_approach_info'
                    });
                  }}
                  className="block bg-zinc-800/50 p-6 rounded-lg border-2 border-zinc-700 hover:border-blue-600 transition-all hover:bg-zinc-800/70 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">
                        NASA's Planetary Defense Coordination Office (PDCO)
                      </h4>
                      <p className="text-zinc-300">
                        Official source for asteroid threat information and planetary defense initiatives
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-blue-400 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="https://cneos.jpl.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-zinc-800/50 p-6 rounded-lg border-2 border-zinc-700 hover:border-blue-600 transition-all hover:bg-zinc-800/70 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">
                        Center for Near-Earth Object Studies (CNEOS)
                      </h4>
                      <p className="text-zinc-300">
                        Real-time tracking and orbit calculations for all known near-Earth objects
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-blue-400 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="https://cneos.jpl.nasa.gov/sentry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-zinc-800/50 p-6 rounded-lg border-2 border-zinc-700 hover:border-blue-600 transition-all hover:bg-zinc-800/70 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">
                        Sentry Impact Monitoring
                      </h4>
                      <p className="text-zinc-300">
                        Automated system for monitoring potential future asteroid impacts
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-blue-400 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="https://cneos.jpl.nasa.gov/ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-zinc-800/50 p-6 rounded-lg border-2 border-zinc-700 hover:border-blue-600 transition-all hover:bg-zinc-800/70 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">
                        NEO Earth Close Approaches
                      </h4>
                      <p className="text-zinc-300">
                        Comprehensive database of past and future near-Earth object close approaches
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-blue-400 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="https://cneos.jpl.nasa.gov/sentry/torino_scale.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-zinc-800/50 p-6 rounded-lg border-2 border-zinc-700 hover:border-blue-600 transition-all hover:bg-zinc-800/70 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">
                        Torino Impact Hazard Scale
                      </h4>
                      <p className="text-zinc-300">
                        Official scale for categorizing asteroid impact hazards (0-10 scale)
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-blue-400 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="https://cneos.jpl.nasa.gov/sentry/palermo_scale.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-zinc-800/50 p-6 rounded-lg border-2 border-zinc-700 hover:border-blue-600 transition-all hover:bg-zinc-800/70 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">
                        Palermo Technical Impact Hazard Scale
                      </h4>
                      <p className="text-zinc-300">
                        Technical scale used by astronomers for precise impact risk assessment
                      </p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-blue-400 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
