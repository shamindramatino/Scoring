
import { Tree, TreeNode } from 'react-organizational-chart';
import { Badge } from "@/components/ui/badge"

  const StyledTreeExample = () => (
     <Tree
       lineWidth={'2px'}
       lineColor={'green'}
       lineStyle={'dashed'}
       lineBorderRadius={'10px'}
       label={""}
     >
       <TreeNode label={<Badge>Child 1</Badge>}>
         <TreeNode label={<Badge>Grand Child</Badge>} />
       </TreeNode>
       <TreeNode label={<Badge>Child 2</Badge>}>
         <TreeNode label={<Badge>Grand Child</Badge>}>
           <TreeNode label={<Badge>Great Grand Child 1</Badge>} />
           <TreeNode label={<Badge>Great Grand Child 2</Badge>} />
         </TreeNode>
       </TreeNode>
       <TreeNode label={<Badge>Child 3</Badge>}>
         <TreeNode label={<Badge>Grand Child 1</Badge>} />
         <TreeNode label={<Badge>Grand Child 2</Badge>} />
       </TreeNode>
     </Tree>
   );
   
   export default StyledTreeExample;