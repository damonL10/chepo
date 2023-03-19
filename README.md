# chepo
CHEPO is web application specially designed to facilitate motor insurance agent to handle routine motor claims. 
The AI of CHEPO could efficiently analyses the part of the vehicle which suffered damage and the level of such damage from the image photo submitted by the customers such that motor insurance agents could quickly obtain all information about the motor claims submitted by their customers.
How to achieve that ? Deep Learing and Transfer Learning is engaged to further utilize an existing model (i.e. Xception from Keras Applications) to solve related but different problems.
With the Xception pre-trained model, additional layer is added to pool the output from Xception to transfer the knowledge for the problems (i.e. (1) to identify vehicle's damaged part and (2) to categorise vehicle damage level) to be exactly solved by CHEPO.
Two custom models, namely Car Part CNN Model and Damage Level CNN Model,with transferred learning from Xception are built and implemented.
