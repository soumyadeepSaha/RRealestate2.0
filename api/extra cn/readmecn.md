what cable is used inorder to connect the two computers?
-> for connecting two same devices we need to use ethernet cross over cable
-> for connecting two different devices we need to use ehernet straight through cable

# connecting  peer to peer
-> take two pcs
->each pc will have two ports
->we are going to connect an ethernet cross over cable we have a port called fastethernet port 
->connect the fast ethernet ports for the fast ethernet connection
->now inorder to make a connection we need to assign ip addresses to the pcs
->click on the computer -> go to desktop -> ip config_.
10.10.10.1(pc1)
config_.
10.10.10.2(pc2)
-> now we will see what is the ip address of this pc and what is the mac address of this pc
-> in command pompt->command-> ip config (for ip address)
-> for physical address(mac) ipconfig /all (space required before /all) mac(48bits)
-> checking whether these two packets are reachable or not
->go to computer(10.10.10.1)-> command prompt -> ping 10.10.10.2 (it send 4 packet)
->if connectivity their it will recieve 4 acknowledgement


# connecting hub to pcs
-aka network hub
-hub works a the physical layer (layer 1)
-used to set up a LAN
-if we want to connect some devices in a local area network we need a central device like a hub or a switch.
- hub has multiple ports
- the local area network coming under hub comes under star topology
- [workingprinciple]: when the packet arrives at one port, it is copied to the other ports so that all segments of  the lan can see al packets.


-> so how to create a hub using cisco packet racer
->in order to communicate the connection between the computers we need to assign ipaddresses to them
-> so we provide ip address to all the pc
->problem ->so their is always a serious problem with broad casting the broad cast by the hub floods the entire network

----> pros--
   1> cheaper than switches
   2> works good for smaller network
----> cons--
   1>issues with broadcast
   2>NO Memory
   3>normally runs in half duplex mode(send/recieve)

   ---because of these drawbacks we are moving from hubs to switches
   

# switches to pcs
-A switch is a networking hardware that connects devices on a computer network to establish a local area network.
-unlike hub,  SWITCH has memory
- what is switch going to do with that memory?
--> in a computer network every device is identified with the help of ip address and mac address so the switch is going to store the mac address in its memory **So switch stores mac address table in memory**
-Switch is a layer 2 device used for setting up a lan
- say 1 is the port no. of the switch to which device 1>(mac(AA-AA)) is connected and 19> i sthe port to which device 2>(BB-BB) is connected.

- so the mac address table of the switch will be 
        |  MAC ADDRESS   | INTERFACE/  |
        |                |   PORT      |
        |      AA-AA     |    1        |
        |                |             |
        |  BB-BB         |   19        |


- THE difference between a hub and the switch is that the sender wants to send any data it sends to port no. 1 now port no. 1 has recieved the data if this was hub it would have copied the data to all the other ports since it is a switch it knows the detination mac address is connected to which port so it will only forward the data to that port and the reciever computer now recieves the data

- so switch is not flooding the data switch is basically sending to the destination
- it doesnot mean that switch cannot do mutlicasting unicasting and broad casting based on the need it does
- process in cisco packet tracer
  here we can see their are 24 ports in a switch these are called fast ethernet ports and in the extreme left their were gigabit ethernet ports
- so these are different from the transport layer when we talk about ports in the layer 2 they are hardware ports

-> now we need copper straight -through cable as wea re going to connect computer with the switch both are different devices so we need straigt through copper cables

- now we are required to assign ip address to every computers or pcs but switch does its operation based on mac address only not with the help of ip address 

->still go to pc->go to desktop-> ip config->10.10.10.->2nd pc 10.10.10.2 -> 10.10.10.3->etc
-> so ip assigned -> unicasting

-> how to see the mac address table in switch?
->click on switch -> go to CLI -> " press enter"->
type "EN" to enable -> type "show mac-address-table

--Difference between a hub and a switch?

-> hub is a layer 1 device(PHYSICAL LAYER) |layer 2 device (DATA LINK LAYER) 
-> hub no memory | switch has memory and stores mac address table
-> hub no intelligence 
->hub floods the network due to broadcasting
->hubs security risks are high 
-> hubs less efficient


# Router to LANS

- connects two or more LANS 
- it is a layer 3 (network layer) device.
- stores routing table. in its memory
- router-inevitable device in the internet.
- internet is a collection of enormous network where every network is going to use different  ip schemes with different different protocols -and routers are inevitable device in the internet'

- Router has two interfaces -connection to LANS
- and the ip address of interface is the default gateway for all the pcs or devices in the local area network 
- SO IN CISCOPT WE ARE GOING TO DO INTER LAN COMMUNICATION VIA AN ROUTER

- take two switches/hubs to create two local area network specifically switches..
- so we are using ethernet straight through cables(different devices) to connect the devices to the switches in both the lans
-assign ip addresses to individual pcs (estabish an local area network)
- choose a router so we need some interphases in the router inorder to connect interphases to the LANS
-so what cables do you need to connect this switch with router?
--as one is a layer 2 device and another one is a layer 3 device so they are different devices so oviously we need copper straight through ethernet cable
- so use gbethernet0/1 of 1 switch and click on the router pubg it into any of the gbthernet pubg say gbethernet0/0 same for the next lan

- by default the ports in the router will be on shutdown mode we are required to turn it on (remeber or note about the interfaces)

- for labeling of ip address(router) 8:55
- say first interface(router )- ip 10.0.0.4
-say 2nd- ip 192.68.1.4
- now to assign ip address to the interface 
we know the name of the first interface is gigabit ethernet 0/0. ->click on router->go to gigabitethernet0/0 (to which the left lan is connected)->10.0.0.4 (subnet by default)->check status of port if off turn it on
- we have to assign 192.168.1.4 to 2nd inter4face and turn it on similarly

- NOW SETUP IS READY  ONE SIDE IS HAVING A DIFFERENT LAN AND OTHER SIDE IS ALSO HAVING A DIFFERENT LAN
- NOW TRY TO PING FROM A DEVICE OF ONE LAN TO A DEVICE OF ANOTHER LAN
- WE WILL FACE PROBLEM IN SENDING A PACKET AS WE MISSED A CONFIG
- the problem is in the router the ip address of 1st"s interface is 10.0.0.4 and this is the default gateway for all the pcs for all the devices in the network-> go to everyindividual pc set the default gateway (in ip configuration as 10.0.0.4)  same for next lan set their default gatways

- now ping
-while transferring message from one pc (LAN1) t another (LAN2)
- when you do stimulation in cpt you can see->

--the first time communication switch always broad casts -> and because we are initiating the packet for the first time it normally gets failed ->in second time communication-> now switch will not do broad casting because it has learned the mac address_> now you can observe the switches will forward the data and through the gateways it will be dent to the destination pc of (lAN2)..(reply will be send.)


