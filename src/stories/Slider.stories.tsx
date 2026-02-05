import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { FieldLabel } from "@/components/ui/form-controls";
import { SliderField, Slider } from "@/components/ui/form-controls";

const meta = {
  title: "Components/Slider",
  component: SliderField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the slider",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Slider orientation",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Description/helper text",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
  },
} satisfies Meta<typeof SliderField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// SliderField Stories - Complete field composition
// ============================================================================

export const Default: Story = {
  args: {
    label: "Volume",
    defaultValue: 50,
    min: 0,
    max: 100,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Brightness",
    description: "Adjust screen brightness",
    defaultValue: 75,
    min: 0,
    max: 100,
  },
};

export const WithError: Story = {
  args: {
    label: "Temperature",
    hasError: true,
    errorMessage: "Temperature out of safe range",
    defaultValue: 85,
    min: 0,
    max: 100,
  },
};

export const WithFormattedValue: Story = {
  args: {
    label: "Volume",
    defaultValue: 50,
    min: 0,
    max: 100,
    formatValue: (value) => `${value}%`,
  },
};

export const HiddenValue: Story = {
  args: {
    label: "Opacity",
    defaultValue: 80,
    min: 0,
    max: 100,
    isValueHidden: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <SliderField
        label="Small"
        inputSize="small"
        defaultValue={30}
        min={0}
        max={100}
      />
      <SliderField
        label="Default"
        inputSize="default"
        defaultValue={50}
        min={0}
        max={100}
      />
      <SliderField
        label="Large"
        inputSize="large"
        defaultValue={70}
        min={0}
        max={100}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Volume",
    disabled: true,
    defaultValue: 50,
    min: 0,
    max: 100,
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Volume",
    labelHidden: true,
    defaultValue: 50,
    min: 0,
    max: 100,
  },
};

export const Controlled: Story = {
  render: () => {
    const [volume, setVolume] = useState(50);

    return (
      <div className="w-96 space-y-4">
        <SliderField
          label="Volume"
          description="Adjust the volume level"
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          formatValue={(val) => `${val}%`}
        />

        <div className="pt-4 border-t border-border-secondary space-y-2">
          <p className="text-sm text-font-secondary">
            <strong>Current volume:</strong> {volume}%
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setVolume(0)}
              className="px-3 py-2 bg-neutral-20 rounded-sm text-sm hover:bg-neutral-30"
            >
              Mute
            </button>
            <button
              onClick={() => setVolume(50)}
              className="px-3 py-2 bg-neutral-20 rounded-sm text-sm hover:bg-neutral-30"
            >
              50%
            </button>
            <button
              onClick={() => setVolume(100)}
              className="px-3 py-2 bg-neutral-20 rounded-sm text-sm hover:bg-neutral-30"
            >
              Max
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const WithSteps: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <SliderField
        label="Step 1"
        description="Moves by 1"
        defaultValue={5}
        min={0}
        max={10}
        step={1}
      />
      <SliderField
        label="Step 5"
        description="Moves by 5"
        defaultValue={50}
        min={0}
        max={100}
        step={5}
      />
      <SliderField
        label="Step 10"
        description="Moves by 10"
        defaultValue={50}
        min={0}
        max={100}
        step={10}
      />
    </div>
  ),
};

export const PriceRange: Story = {
  render: () => {
    const [price, setPrice] = useState(500);
    const minPrice = 0;
    const maxPrice = 1000;

    return (
      <div className="w-96 space-y-4">
        <SliderField
          label="Price Filter"
          description="Filter products by price"
          value={price}
          onChange={setPrice}
          min={minPrice}
          max={maxPrice}
          step={10}
          formatValue={(val) => `$${val}`}
        />

        <div className="pt-4 border-t border-border-secondary">
          <p className="text-sm text-font-secondary">
            Showing products up to <strong>${price}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const TemperatureControl: Story = {
  render: () => {
    const [temp, setTemp] = useState(22);
    const minTemp = 16;
    const maxTemp = 30;

    const getTempColor = (temperature: number) => {
      if (temperature < 18) return "text-blue-60";
      if (temperature < 22) return "text-primary-60";
      if (temperature < 26) return "text-orange-60";
      return "text-red-60";
    };

    return (
      <div className="w-96 space-y-4">
        <SliderField
          label="Room Temperature"
          description="Set your desired temperature"
          value={temp}
          onChange={setTemp}
          min={minTemp}
          max={maxTemp}
          step={0.5}
          formatValue={(val) => `${val}°C`}
        />

        <div className="pt-4 border-t border-border-secondary space-y-2">
          <p className={`text-base font-semibold ${getTempColor(temp)}`}>
            {temp}°C
          </p>
          <p className="text-sm text-font-secondary">
            {temp < 20 && "Cool"}
            {temp >= 20 && temp < 24 && "Comfortable"}
            {temp >= 24 && temp < 27 && "Warm"}
            {temp >= 27 && "Hot"}
          </p>
        </div>
      </div>
    );
  },
};

export const BrightnessControl: Story = {
  render: () => {
    const [brightness, setBrightness] = useState(80);

    return (
      <div className="w-96 space-y-4">
        <SliderField
          label="Screen Brightness"
          value={brightness}
          onChange={setBrightness}
          min={0}
          max={100}
          formatValue={(val) => `${val}%`}
        />

        <div
          className="h-24 rounded-lg transition-all duration-300 border-2 border-border-primary flex items-center justify-center"
          style={{ opacity: brightness / 100 }}
        >
          <p className="text-base font-medium">Preview</p>
        </div>
      </div>
    );
  },
};

export const AudioMixer: Story = {
  render: () => {
    const [levels, setLevels] = useState({
      master: 80,
      music: 60,
      voice: 70,
      effects: 50,
    });

    const updateLevel = (channel: keyof typeof levels, value: number) => {
      setLevels((prev) => ({ ...prev, [channel]: value }));
    };

    return (
      <div className="w-96 space-y-6">
        <h3 className="text-xl font-semibold">Audio Mixer</h3>

        <SliderField
          label="Master Volume"
          value={levels.master}
          onChange={(val) => updateLevel("master", val)}
          min={0}
          max={100}
          formatValue={(val) => `${val}%`}
          inputSize="large"
        />

        <div className="space-y-4 pt-4 border-t border-border-secondary">
          <SliderField
            label="Music"
            value={levels.music}
            onChange={(val) => updateLevel("music", val)}
            min={0}
            max={100}
            formatValue={(val) => `${val}%`}
          />
          <SliderField
            label="Voice"
            value={levels.voice}
            onChange={(val) => updateLevel("voice", val)}
            min={0}
            max={100}
            formatValue={(val) => `${val}%`}
          />
          <SliderField
            label="Effects"
            value={levels.effects}
            onChange={(val) => updateLevel("effects", val)}
            min={0}
            max={100}
            formatValue={(val) => `${val}%`}
          />
        </div>
      </div>
    );
  },
};

// ============================================================================
// Slider Stories - Base component without field wrapper
// ============================================================================

export const SliderBasic: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-font-secondary mb-4">
        This is the <code>Slider</code> component - just the slider control, no
        label/error wrapper
      </p>
      <Slider defaultValue={[50]} min={0} max={100} />
    </div>
  ),
};

export const SliderCustomComposition: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div className="w-96 space-y-2">
        <p className="text-sm text-font-secondary mb-4">
          Custom composition using <code>Slider</code> with separate Label
        </p>

        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="custom-slider">Volume</FieldLabel>
          <span className="text-sm text-font-secondary">
            {value[0]}%
          </span>
        </div>

        <Slider
          id="custom-slider"
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
        />
      </div>
    );
  },
};

export const SliderSizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <FieldLabel inputSize="small" className="mb-2 block">
          Small
        </FieldLabel>
        <Slider inputSize="small" defaultValue={[30]} min={0} max={100} />
      </div>
      <div>
        <FieldLabel className="mb-2 block">Default</FieldLabel>
        <Slider inputSize="default" defaultValue={[50]} min={0} max={100} />
      </div>
      <div>
        <FieldLabel inputSize="large" className="mb-2 block">
          Large
        </FieldLabel>
        <Slider inputSize="large" defaultValue={[70]} min={0} max={100} />
      </div>
    </div>
  ),
};
