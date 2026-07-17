'use client';

import { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DecisionTreeNode as TreeNodeType } from '@/lib/types';

// Custom node component
function DecisionNode({ data }: { data: { label: string; type: string; probability?: number; outcome?: string } }) {
  const typeStyles = {
    decision: 'bg-gradient-to-br from-primary to-primary-hover text-white border-primary/50',
    chance: 'bg-card text-text-primary border-primary/30',
    outcome: 'bg-surface text-text-secondary border-border',
  };

  return (
    <div className={`rounded-xl border px-4 py-3 min-w-[140px] max-w-[200px] shadow-lg ${typeStyles[data.type as keyof typeof typeStyles] || typeStyles.outcome}`}>
      <Handle type="target" position={Position.Top} className="!bg-primary !w-2 !h-2 !border-0" />
      <div className="text-xs font-semibold text-center mb-1">{data.label}</div>
      {data.probability !== undefined && (
        <div className="text-[10px] text-center opacity-70 font-mono">{data.probability}% probability</div>
      )}
      {data.outcome && (
        <div className="text-[10px] text-center opacity-70 mt-1">{data.outcome}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-primary !w-2 !h-2 !border-0" />
    </div>
  );
}

const nodeTypes = { custom: DecisionNode };

function flattenTree(
  node: TreeNodeType,
  parentId: string | null,
  x: number,
  y: number,
  level: number,
  index: number,
  totalSiblings: number
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const nodeId = node.id;
  const horizontalSpacing = Math.max(200, 350 - level * 40);

  nodes.push({
    id: nodeId,
    type: 'custom',
    position: { x, y },
    data: {
      label: node.label,
      type: node.type,
      probability: node.probability,
      outcome: node.outcome,
    },
  });

  if (parentId) {
    edges.push({
      id: `e-${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      style: { stroke: '#FF6A2A', strokeWidth: 2 },
      animated: node.type === 'outcome',
    });
  }

  if (node.children) {
    const totalWidth = (node.children.length - 1) * horizontalSpacing;
    const startX = x - totalWidth / 2;

    node.children.forEach((child, i) => {
      const childX = startX + i * horizontalSpacing;
      const childY = y + 120;
      const result = flattenTree(child, nodeId, childX, childY, level + 1, i, node.children!.length);
      nodes.push(...result.nodes);
      edges.push(...result.edges);
    });
  }

  return { nodes, edges };
}

export function DecisionTreeFlow({ tree }: { tree: TreeNodeType }) {
  const { nodes, edges } = useMemo(() => {
    return flattenTree(tree, null, 400, 30, 0, 0, 1);
  }, [tree]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading text-lg font-semibold">Decision Tree</h3>
        <p className="text-xs text-text-muted">Interactive probability tree — zoom, pan, and explore outcomes</p>
      </div>
      <div className="h-[450px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1A1A1A" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
