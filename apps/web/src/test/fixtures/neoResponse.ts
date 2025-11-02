import type { NeoFeedResponse } from "@/types/neo";

export const mockNeoResponse: NeoFeedResponse = {
  links: {
    next: "http://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-02&end_date=2024-01-03&api_key=DEMO_KEY",
    previous: "http://api.nasa.gov/neo/rest/v1/feed?start_date=2023-12-31&end_date=2024-01-01&api_key=DEMO_KEY",
    self: "http://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-01&end_date=2024-01-02&api_key=DEMO_KEY",
  },
  element_count: 5,
  near_earth_objects: {
    "2024-01-01": [
      {
        links: {
          self: "http://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=DEMO_KEY",
        },
        id: "2000433",
        neo_reference_id: "2000433",
        name: "433 Eros (A898 PA)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2000433",
        absolute_magnitude_h: 10.31,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 22.1468588238,
            estimated_diameter_max: 49.5075579682,
          },
          meters: {
            estimated_diameter_min: 22146.8588237722,
            estimated_diameter_max: 49507.5579681526,
          },
          miles: {
            estimated_diameter_min: 13.7621824891,
            estimated_diameter_max: 30.7621400424,
          },
          feet: {
            estimated_diameter_min: 72659.6416792634,
            estimated_diameter_max: 162424.3700823907,
          },
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "2024-01-01",
            close_approach_date_full: "2024-Jan-01 12:00",
            epoch_date_close_approach: 1704110400000,
            relative_velocity: {
              kilometers_per_second: "5.5436104471",
              kilometers_per_hour: "19957.0976095912",
              miles_per_hour: "12400.1234567890",
            },
            miss_distance: {
              astronomical: "0.3149291212",
              lunar: "122.5074321588",
              kilometers: "47116732.348792644",
              miles: "29278089.7643459672",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: false,
      },
      {
        links: {
          self: "http://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY",
        },
        id: "3542519",
        neo_reference_id: "3542519",
        name: "(2010 PK9)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
        absolute_magnitude_h: 21.1,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.1444307184,
            estimated_diameter_max: 0.3229612552,
          },
          meters: {
            estimated_diameter_min: 144.4307183562,
            estimated_diameter_max: 322.9612551557,
          },
          miles: {
            estimated_diameter_min: 0.0897428885,
            estimated_diameter_max: 0.2006570085,
          },
          feet: {
            estimated_diameter_min: 473.8543953871,
            estimated_diameter_max: 1059.5841600699,
          },
        },
        is_potentially_hazardous_asteroid: true,
        close_approach_data: [
          {
            close_approach_date: "2024-01-01",
            close_approach_date_full: "2024-Jan-01 08:30",
            epoch_date_close_approach: 1704097800000,
            relative_velocity: {
              kilometers_per_second: "18.7529234567",
              kilometers_per_hour: "67510.5244444444",
              miles_per_hour: "41950.1234567890",
            },
            miss_distance: {
              astronomical: "0.1234567890",
              lunar: "48.0246947100",
              kilometers: "18476321.123456789",
              miles: "11481234.5678901234",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: false,
      },
    ],
    "2024-01-02": [
      {
        links: {
          self: "http://api.nasa.gov/neo/rest/v1/neo/2001036?api_key=DEMO_KEY",
        },
        id: "2001036",
        neo_reference_id: "2001036",
        name: "1036 Ganymed (A924 UB)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2001036",
        absolute_magnitude_h: 9.45,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 31.6227766017,
            estimated_diameter_max: 70.7106781187,
          },
          meters: {
            estimated_diameter_min: 31622.7766016838,
            estimated_diameter_max: 70710.6781186548,
          },
          miles: {
            estimated_diameter_min: 19.6476761853,
            estimated_diameter_max: 43.9339828221,
          },
          feet: {
            estimated_diameter_min: 103750.5872780184,
            estimated_diameter_max: 231990.4135464469,
          },
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "2024-01-02",
            close_approach_date_full: "2024-Jan-02 15:45",
            epoch_date_close_approach: 1704209100000,
            relative_velocity: {
              kilometers_per_second: "12.3456789012",
              kilometers_per_hour: "44444.4444444444",
              miles_per_hour: "27616.1234567890",
            },
            miss_distance: {
              astronomical: "0.4567890123",
              lunar: "177.6909357877",
              kilometers: "68345678.901234567",
              miles: "42467890.1234567890",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: false,
      },
      {
        links: {
          self: "http://api.nasa.gov/neo/rest/v1/neo/3726710?api_key=DEMO_KEY",
        },
        id: "3726710",
        neo_reference_id: "3726710",
        name: "(2015 RC)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3726710",
        absolute_magnitude_h: 24.3,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.0316227766,
            estimated_diameter_max: 0.0707106781,
          },
          meters: {
            estimated_diameter_min: 31.6227766017,
            estimated_diameter_max: 70.7106781187,
          },
          miles: {
            estimated_diameter_min: 0.0196476762,
            estimated_diameter_max: 0.0439339828,
          },
          feet: {
            estimated_diameter_min: 103.7505872780,
            estimated_diameter_max: 231.9904135464,
          },
        },
        is_potentially_hazardous_asteroid: true,
        close_approach_data: [
          {
            close_approach_date: "2024-01-02",
            close_approach_date_full: "2024-Jan-02 20:15",
            epoch_date_close_approach: 1704225300000,
            relative_velocity: {
              kilometers_per_second: "8.9012345678",
              kilometers_per_hour: "32044.4444444444",
              miles_per_hour: "19909.1234567890",
            },
            miss_distance: {
              astronomical: "0.0456789012",
              lunar: "17.7690935788",
              kilometers: "6834567.890123456",
              miles: "4246789.012345678",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: true,
      },
      {
        links: {
          self: "http://api.nasa.gov/neo/rest/v1/neo/3843234?api_key=DEMO_KEY",
        },
        id: "3843234",
        neo_reference_id: "3843234",
        name: "(2019 OK)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3843234",
        absolute_magnitude_h: 22.5,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.0707106781,
            estimated_diameter_max: 0.1581138830,
          },
          meters: {
            estimated_diameter_min: 70.7106781187,
            estimated_diameter_max: 158.1138830084,
          },
          miles: {
            estimated_diameter_min: 0.0439339828,
            estimated_diameter_max: 0.0982476762,
          },
          feet: {
            estimated_diameter_min: 231.9904135464,
            estimated_diameter_max: 518.7461721405,
          },
        },
        is_potentially_hazardous_asteroid: true,
        close_approach_data: [
          {
            close_approach_date: "2024-01-02",
            close_approach_date_full: "2024-Jan-02 03:22",
            epoch_date_close_approach: 1704164520000,
            relative_velocity: {
              kilometers_per_second: "24.5678901234",
              kilometers_per_hour: "88444.4444444444",
              miles_per_hour: "54951.1234567890",
            },
            miss_distance: {
              astronomical: "0.0198765432",
              lunar: "7.7319743168",
              kilometers: "2973456.789012345",
              miles: "1847890.123456789",
            },
            orbiting_body: "Earth",
          },
        ],
        is_sentry_object: false,
      },
    ],
  },
};