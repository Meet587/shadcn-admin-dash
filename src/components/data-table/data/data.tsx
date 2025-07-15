import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Brackets,
  CircleCheck,
  CircleIcon,
  CircleX,
  StopCircleIcon,
} from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: Brackets,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopCircleIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CircleCheck,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleX,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp,
  },
];
