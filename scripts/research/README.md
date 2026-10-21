# Research scripts

The original standalone OpenPyStruct scripts, kept for reference and reproducibility. The supported
entry point is the [`openpystruct`](../../openpystruct/) package and the Grasshopper plugin; these
scripts are what they were factored from. `beta/` holds experimental scripts.

## **Script Usage Documentation**

### **Single Load Optimizer**

 [Link to file in repo](./OpenPyStruct_BeamOpt.py)

#### **Overview**

This script optimizes the **moment of inertia distribution** along a beam to minimize structural response (e.g., deflection, internal forces) while maintaining structural efficiency. The optimization iteratively adjusts the moment of inertia of beam elements to reduce bending and shear energy losses.

#### **Key Features**

- **OpenSeesPy-based** finite element analysis.
- **PyTorch-powered** gradient-based optimization.
- Simulates **beam behavior** under various loads (point forces, distributed loads).
- **Randomized placement** of roller supports and point loads for robustness.
- Optimizes **moment of inertia** to minimize structural energy loss.
- Implements **early stopping** for computational efficiency.
- **Visualization** of optimization progress and structural response.



#### **Workflow**

1. **Define Model Parameters:**
   - Material properties (Young’s modulus, Poisson’s ratio)
   - Beam geometry (length, cross-section)
   - Boundary conditions (roller and pinned supports)
   - Loading conditions (point loads, distributed loads)

2. **Set Up the Finite Element Model:**
   - Define nodes and elements in **OpenSeesPy**
   - Apply supports and loads
   - Assign varying moment of inertia values

3. **Optimize the Moment of Inertia:**
   - Use **Adam optimizer** with **exponential learning rate decay**
   - Compute loss as a combination of:
     - **Primary loss:** Total moment of inertia
     - **Bending energy loss:** Based on internal moments
     - **Shear energy loss:** Based on shear forces
   - Update inertia values using **gradient descent**
   - Clamp inertia values to prevent negative values
   - Implement **early stopping** if loss stagnates

4. **Run Finite Element Analysis (FEA):**
   - Perform static analysis in **OpenSeesPy**
   - Extract **deflections, rotations, shear forces, and bending moments**

5. **Visualization and Results:**
   - Plot **loss history** over optimization epochs
   - Display **beam deformation, moment of inertia distribution, shear forces, and bending moments**
   - Highlight **support locations and applied forces**




---
