import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { ReactFlowProvider,Controls, addEdge, useNodesState, useEdgesState, Background } from 'reactflow';
import { Card } from '@/components/ui/card';
import 'reactflow/dist/style.css';



interface Note {
  notesId: string;
  title: string;
  link: string;
  tstamp: string;
}


interface TreeMenuProps 
{
  setShowDetails: (open: boolean) => void;
  setNotes:(notes: any) => void;
  getNotesInfo:any;
  selectedNodeData:any;
  onNodeClick:(event:any,notes: any) => void;
  initialEdges:any,
  initialNodes:any,
  getShowDetails:boolean

}


interface Note {
  notesId: string;
  [key: string]: any;
}

interface Resource {
  resourceId: string;
  [key: string]: any;
}

interface Info {
  id: string;
  data: any;
}

interface MergedData {
  id: string;
  data: any;
  notes: Note[];
  resources: Resource[];
}

const ProviderFlow = ({onNodeClick,initialEdges,initialNodes,getShowDetails}: TreeMenuProps) => 
{
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([...initialEdges]);


  useEffect(()=>
  {

    setNodes(initialNodes)
    setEdges([...initialEdges])

  },[initialNodes,initialEdges])



  const onConnect = useCallback((params:any) => setEdges((els) => addEdge(params, els)), [setEdges]);


  const proOptions = { hideAttribution: true };

  return (

    <ReactFlowProvider>
  
          <ReactFlow
             nodes={nodes}
             edges={edges}
             onNodesChange={onNodesChange}
             onEdgesChange={onEdgesChange}
             onConnect={onConnect}
             onNodeClick={onNodeClick}
             proOptions={proOptions}
       
             fitViewOptions={{
              padding: 0.1,
              includeHiddenNodes: false,
              minZoom: 0.1,
              maxZoom: 1,
              nodes:initialNodes
           }}
          fitView
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          panOnDrag
          
          >
          {/* <Controls/> */}

          </ReactFlow>
          
    </ReactFlowProvider>
  );
};

export default ProviderFlow;
