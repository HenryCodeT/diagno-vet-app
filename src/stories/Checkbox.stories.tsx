import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/form-controls/primitive-inputs/checkbox";
import { cn } from "@/lib/utils";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state (shows error border color)",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    checked: "indeterminate",
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
    defaultChecked: false,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Unchecked</div>
        <Checkbox defaultChecked={false} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Checked</div>
        <Checkbox defaultChecked={true} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Indeterminate</div>
        <Checkbox checked="indeterminate" />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Disabled</div>
        <Checkbox disabled defaultChecked={false} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Disabled Checked</div>
        <Checkbox disabled defaultChecked={true} />
      </div>
      <div className="flex gap-6 items-center">
        <div className="w-32 text-font-secondary">Error</div>
        <Checkbox hasError defaultChecked={false} />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(checked) => setChecked(checked === true)}
        />
        <label
          htmlFor="terms"
          className="text-base font-medium cursor-pointer"
        >
          Accept terms and conditions
        </label>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "Notifications", checked: true },
      { id: "2", label: "Marketing emails", checked: false },
      { id: "3", label: "Security alerts", checked: true },
    ]);

    const toggleItem = (id: string) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="w-96 space-y-4">
        <h3 className="text-xl font-semibold">Email Preferences</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <label
                htmlFor={item.id}
                className="text-base cursor-pointer flex-1"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "Item 1", checked: true },
      { id: "2", label: "Item 2", checked: false },
      { id: "3", label: "Item 3", checked: false },
      { id: "4", label: "Item 4", checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked) && !allChecked;

    const toggleAll = () => {
      const newCheckedState = !allChecked;
      setItems(items.map((item) => ({ ...item, checked: newCheckedState })));
    };

    const toggleItem = (id: string) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="w-64 space-y-4">
        <div className="flex items-center gap-2 border-b border-border-secondary pb-3">
          <Checkbox
            id="select-all"
            checked={someChecked ? "indeterminate" : allChecked}
            onCheckedChange={toggleAll}
          />
          <label
            htmlFor="select-all"
            className="text-base font-semibold cursor-pointer flex-1"
          >
            Select All
          </label>
        </div>
        <div className="space-y-3 pl-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <label
                htmlFor={item.id}
                className="text-base cursor-pointer flex-1"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div className="flex gap-2">
        <Checkbox id="marketing" />
        <div className="flex flex-col gap-xxs">
          <label htmlFor="marketing" className="text-base font-medium cursor-pointer">
            Marketing Communications
          </label>
          <p className="text-sm text-font-secondary">
            Receive emails about new products, features, and updates.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Checkbox id="security" defaultChecked />
        <div className="flex flex-col gap-xxs">
          <label htmlFor="security" className="text-base font-medium cursor-pointer">
            Security Alerts
          </label>
          <p className="text-sm text-font-secondary">
            Get notified about important security updates and activity.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled-checkbox"
            checked={checked}
            onCheckedChange={(checked) => setChecked(checked === true)}
          />
          <label htmlFor="controlled-checkbox" className="text-base">
            {checked ? "Checked" : "Unchecked"}
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChecked(true)}
            className="px-3 py-2 bg-primary-80 text-white rounded text-sm"
          >
            Check
          </button>
          <button
            onClick={() => setChecked(false)}
            className="px-3 py-2 bg-neutral-60 text-white rounded text-sm"
          >
            Uncheck
          </button>
        </div>
      </div>
    );
  },
};

export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: "1", text: "Buy groceries", completed: false },
      { id: "2", text: "Walk the dog", completed: true },
      { id: "3", text: "Read a book", completed: false },
      { id: "4", text: "Write code", completed: true },
    ]);

    const toggleTodo = (id: string) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    return (
      <div className="w-80 space-y-3">
        <h3 className="text-xl font-semibold mb-4">My Tasks</h3>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 py-2">
            <Checkbox
              id={todo.id}
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <label
              htmlFor={todo.id}
              className={cn(
                "text-base cursor-pointer flex-1",
                todo.completed && "line-through text-font-disabled"
              )}
            >
              {todo.text}
            </label>
          </div>
        ))}
      </div>
    );
  },
};
