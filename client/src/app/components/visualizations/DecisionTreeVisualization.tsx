/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Tree component with no SSR
const Tree = dynamic(() => import('react-d3-tree').then(mod => mod.Tree), {
  ssr: false
});

interface TreeNode {
  name: string;
  children?: TreeNode[];
  attributes?: {
    splitValue?: number;
    feature?: string;
    prediction?: string | number;
  };
}

const DecisionTreeVisualization: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode>({
    name: 'Root',
    attributes: { feature: 'Credit Score', splitValue: 700 },
    children: [
      {
        name: 'Left',
        attributes: { feature: 'Income', splitValue: 50000 },
        children: [
          {
            name: 'Left-Left',
            attributes: { prediction: 'Reject' }
          },
          {
            name: 'Left-Right',
            attributes: { prediction: 'Approve' }
          }
        ]
      },
      {
        name: 'Right',
        attributes: { prediction: 'Approve' }
      }
    ]
  });

  const [maxDepth, setMaxDepth] = useState(3);
  const [minSamples, setMinSamples] = useState(2);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMaxDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDepth(Number(e.target.value));
  };

  const handleMinSamplesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSamples(Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Interactive Decision Tree</h2>
      
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Maximum Depth: {maxDepth}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={maxDepth}
            onChange={handleMaxDepthChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Samples: {minSamples}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={minSamples}
            onChange={handleMinSamplesChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="h-[600px] bg-gray-900 rounded-lg p-4">
        {isClient && (
          <Tree
            data={treeData}
            orientation="vertical"
            pathFunc="step"
            separation={{ siblings: 2, nonSiblings: 2.5 }}
            translate={{ x: 400, y: 50 }}
            renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
              <g>
                <circle
                  r={15}
                  onClick={toggleNode}
                  fill={nodeDatum.attributes?.prediction ? '#10B981' : '#6366F1'}
                  stroke="#fff"
                  strokeWidth={2}
                />
                <text
                  dy=".31em"
                  x={nodeDatum.children ? -40 : 40}
                  textAnchor={nodeDatum.children ? 'end' : 'start'}
                  style={{ fill: '#fff', fontSize: '12px' }}
                >
                  {nodeDatum.attributes?.feature && (
                    <tspan x={nodeDatum.children ? -40 : 40} dy="-1.2em">
                      {nodeDatum.attributes.feature}
                    </tspan>
                  )}
                  {nodeDatum.attributes?.splitValue && (
                    <tspan x={nodeDatum.children ? -40 : 40} dy="1.2em">
                      {nodeDatum.attributes.splitValue}
                    </tspan>
                  )}
                  {nodeDatum.attributes?.prediction && (
                    <tspan x={nodeDatum.children ? -40 : 40} dy="1.2em">
                      {nodeDatum.attributes.prediction}
                    </tspan>
                  )}
                </text>
              </g>
            )}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></div>
          <span>Decision Node</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
          <span>Leaf Node</span>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeVisualization; 