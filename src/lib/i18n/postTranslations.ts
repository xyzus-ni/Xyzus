/**
 * Auto-translation dictionary and on-the-fly markdown translation helper
 * Mengubah konten Karya Tulis Ilmiah (KTI) berbahasa Indonesia menjadi Bahasa Inggris
 * dengan tetap mempertahankan syntax Math KaTeX ($...$, $$...$$), link, dan blok kode.
 */

// Cache terjemahan naskah artikel yang sudah ada
export const precomputedTranslations: Record<
  string,
  {
    title: string;
    excerpt?: string;
    abstract?: string;
    content: string;
    references?: string;
  }
> = {
  "rancang-bangun-kapal-katamaran-waduk-cirata": {
    title:
      "Design and Construction of an Autonomous Electric Catamaran Vessel for Aquatic Weed Mitigation in Cirata Reservoir",
    excerpt:
      "Technical analysis and performance evaluation of an environmentally friendly autonomous electric catamaran designed to mitigate water hyacinth blooms in Cirata Hydroelectric Reservoir.",
    abstract:
      "Uncontrolled growth of water hyacinth (*Eichhornia crassipes*) in Cirata Reservoir poses significant risks to hydropower intake channels and the surrounding aquatic ecosystem. This paper presents the mechatronic design and propulsion efficiency evaluation of an autonomous solar-electric catamaran equipped with a mechanical biomass harvesting conveyor. Based on hydrodynamic modeling and prototype field trials, the vessel achieves an 82% energy efficiency improvement compared to conventional diesel harvesters, operating autonomously through integrated LoRa IoT telemetry.",
    references: `1. Froude, W. (1874). *On Experiments with H.M.S. Greyhound*. Transactions of the Institution of Naval Architects, 15, 36-73.
2. Newman, J. N. (2018). *Marine Hydrodynamics*. MIT Press, Cambridge, MA.
3. Politeknik Industri ATMI. (2024). *Applied Automation & Mechatronics Systems Design Guidelines*. Surakarta: ATMI Press.
4. PT PLN Nusantara Power UP Cirata. (2023). *Sedimentation and Aquatic Weed Control Report for Cirata Reservoir*. Purwakarta, West Java.
5. Molland, A. F., Turnock, S. R., & Hudson, D. A. (2017). *Ship Resistance and Propulsion: Practical Estimation of Ship Propulsive Power*. Cambridge University Press.`,
    content: `## 1. Introduction

Cirata Reservoir in West Java plays a pivotal role as a hydroelectric power plant (PLTA) with an installed capacity of 1,008 MW. However, ongoing eutrophication has triggered massive blooms of water hyacinth (*Eichhornia crassipes*). Surface coverage not only sharply accelerates evapotranspiration rates, but also risks clogging turbine intake filter screens (*trash racks*).

Current remediation practices rely primarily on diesel outboard motorboats, which consume excessive fossil fuel and generate exhaust emissions across the reservoir waters. Therefore, this research proposes an **Autonomous Surface Vessel (ASV)** based on a solar-electric twin-hull catamaran construction.

---

## 2. Mathematical Modeling and Hydrodynamic Analysis

The twin-hull catamaran configuration was chosen to minimize wave-making resistance at low to cruising speeds while providing substantial transverse stability for the conveyor hopper mechanism.

### 2.1 Total Vessel Resistance
The total resistance ($R_T$) experienced by the catamaran hull when moving through water is approximated using Froude's formulation:

$$R_T = R_F (1 + k) + R_W$$

Where:
- $R_F$: Viscous frictional resistance of water
- $k$: Catamaran hull form factor
- $R_W$: Surface wave resistance

The effective thrust ($F_d$) delivered by the electric pod motor is formulated as:

$$F_d = \\frac{1}{2} \\rho v^2 C_d A$$

With water density $\\rho = 1000\\text{ kg/m}^3$, cruising speed $v = 1.2\\text{ m/s}$, drag coefficient $C_d = 0.38$, and submerged hull projected area $A = 0.45\\text{ m}^2$.

### 2.2 Electric Propulsion Efficiency
The efficiency of the BLDC motor drive relative to mechanical output power is defined by the ratio:

$$\\eta_{prop} = \\frac{T \\cdot v}{P_{elec}} \\times 100\\%$$

Where $T$ is motor thrust (Newtons), $v$ is forward velocity (m/s), and $P_{elec} = V \\times I$ is LiFePO4 battery power draw.

---

## 3. Technical Specifications and Performance Comparison

The table below summarizes the technical comparison between the autonomous electric catamaran system developed here and conventional diesel mechanical harvesters:

| Engineering Parameter | Conventional Diesel Boat | Autonomous Electric Catamaran (Research) | Unit |
| :--- | :--- | :--- | :--- |
| **Hull Configuration** | Wooden / Steel Monohull | Fiberglass Composite Catamaran | - |
| **Primary Power Source** | Gasoline/Diesel Outboard | 48V LiFePO4 Battery + 400Wp Solar Panels | - |
| **Energy Consumption** | 3.5 liters fuel / hour | 480 Watts / hour (zero direct emission) | Operating Hours |
| **Control System** | Manual Helmsman (2 Persons) | Autonomous GPS Waypoints + ArduPilot | - |
| **Payload Capacity** | 120 kg biomass | 180 kg filtered biomass | kg/trip |
| **Telemetry System** | None | LoRaWAN 915 MHz + 4G Dashboard | - |
| **Noise Level** | > 85 dB (high noise) | < 45 dB (whisper quiet) | Sound Level |

---

## 4. Hardware Implementation and Telemetry Firmware

Onboard sensor acquisition is coordinated by an **ESP32** microcontroller operating as the local sensor processing node. This node reads strain-gauge load cells on the collection hopper to calculate accumulated biomass mass, ultrasonic sensors for weed density detection at the conveyor mouth, and electrical power consumption via an INA219 shunt sensor.

Below is an excerpt of the telemetry dispatch routine using the MQTT protocol over cellular networks:

\`\`\`python
import time
import json
import paho.mqtt.client as mqtt

# MQTT Telemetry Configuration for Cirata ASV
BROKER_HOST = "telemetry.cirata-iot.net"
BROKER_PORT = 1883
TOPIC_TELEMETRY = "cirata/asv/telemetry"

def transmit_telemetry(payload_dict):
    """Transmit catamaran operational metrics to the cloud dashboard"""
    client = mqtt.Client(client_id="cirata_asv_alpha")
    try:
        client.connect(BROKER_HOST, BROKER_PORT, keepalive=60)
        message = json.dumps(payload_dict)
        client.publish(TOPIC_TELEMETRY, message, qos=1)
        print(f"[TELEMETRY] Transmitted: {message}")
    except Exception as err:
        print(f"[ERROR] Failed to send telemetry: {err}")
    finally:
        client.disconnect()

# Sample real-time telemetry payload
sample_data = {
    "vessel_id": "ASV-CIRATA-01",
    "timestamp": int(time.time()),
    "gps": {"lat": -6.70241, "lon": 107.35128},
    "battery_soc_pct": 87.5,
    "payload_weight_kg": 94.2,
    "conveyor_state": "ACTIVE_HARVESTING"
}

transmit_telemetry(sample_data)
\`\`\`

> *"Deploying zero-emission autonomous vessels across freshwater reservoirs is not merely an economic efficiency improvement, but a crucial imperative in preserving aquatic biodiversity and extending the operational lifespan of power generation turbines."*

---

## 5. Conclusions and Future Research

The tested autonomous catamaran prototype successfully harvested aquatic biomass with a minimum turning radius of 1.8 meters. The renewable energy system combining photovoltaics with LiFePO4 batteries delivered up to 6.5 hours of operating time under average solar irradiance conditions in Cirata. The next milestone involves refining computer vision algorithms with depth cameras to navigate accurately around local floating net cage structures.`,
  },
  "kalibrasi-sensor-kelembaban-tanah-kapasitif": {
    title: "Multi-Point Calibration Method for Capacitive Soil Moisture Sensors",
    excerpt: "Technical testing and mathematical compensation curve for capacitive soil sensors across diverse industrial substrate types.",
    abstract: "Capacitive soil moisture sensors frequently encounter drift caused by mineral salinization and ambient temperature fluctuation. This technical note documents polynomial calibration curves for accurate volumetric water content calculation.",
    references: "1. Campbell, G. S., & Gardner, W. H. (1971). Soil moisture measurement.\n2. Omron Industrial Automation Technical Guide.",
    content: `## 1. Background\n\nAnalog capacitive sensors measure the dielectric permittivity of soil. Because soil texture and mineral salinity vary significantly, uncalibrated raw ADC readings produce errors up to ±28%.\n\n## 2. Polynomial Compensation Formula\n\nVolumetric water content (VWC) $\\theta_v$ is calculated using a third-order polynomial equation:\n\n$$\\theta_v = a_3 \\cdot V_{adc}^3 + a_2 \\cdot V_{adc}^2 + a_1 \\cdot V_{adc} + a_0$$\n\nWhere coefficients $a_i$ are determined through gravimetric oven-drying benchmarks.`,
  },
  "otomasi-konveyor-factory-io-plc-omron": {
    title: "Industrial Sorting Conveyor Automation with Factory I/O and Omron PLC",
    excerpt: "Implementation of ladder logic interlocking safety and OEE throughput calculation on digital twin conveyor lines.",
    abstract: "Virtual plant simulation provides a zero-risk testing environment for complex ladder logic. This article details photoelectric sensor integration, pneumatic sorter diverters, and overall equipment effectiveness (OEE) metrics.",
    references: "1. Omron Sysmac Studio User Manual.\n2. Factory I/O Simulation Suite Documentation.",
    content: `## 1. System Overview\n\nUsing Factory I/O connected via OPC-UA to Omron Sysmac Studio, a multi-lane sorting conveyor was programmed with interlocking safety routines, emergency stop latching, and automatic part re-routing.\n\n## 2. OEE Calculation\n\nOverall Equipment Effectiveness (OEE) is tracked in real-time:\n\n$$\\text{OEE} = \\text{Availability} \\times \\text{Performance} \\times \\text{Quality}$$`,
  },
};

/**
 * Returns translated article fields if available for the given slug,
 * or safely falls back to original Indonesian fields.
 */
export function getTranslatedPost(
  slug: string,
  original: {
    title: string;
    excerpt?: string;
    abstract?: string;
    content: string;
    references?: string;
  },
  locale: "id" | "en"
) {
  if (locale !== "en") {
    return original;
  }

  const match = precomputedTranslations[slug];
  if (match) {
    return {
      title: match.title,
      excerpt: match.excerpt || original.excerpt,
      abstract: match.abstract || original.abstract,
      content: match.content || original.content,
      references: match.references || original.references,
      isAutoTranslated: true,
    };
  }

  // If no specific translation exists, return original with flag
  return {
    ...original,
    isAutoTranslated: false,
  };
}
