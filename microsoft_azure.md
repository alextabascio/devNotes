# MICROSOFT AZURE NOTES

## BASIC CONCEPTS

Regions
    Every resource will get placed in a region
    How to select a region
        Geographical proximity to the system’s audience
        Service Availability
        Availability zones
        Pricing

Resource Groups
    Used for grouping resources by a logic boundary
    Free
        Can create as many as you want
    Examples of resource groups
        Development / Test / Production resources
        Team A vs Team B
    Resource Groups vs Subscriptions
        Subscriptions
            Have associated accounts (Account level)
            Cost centre
        RGs
            Containers for the resources themselves
    Naming conventions
        Have “rg” as a prefix
        RG-Development

Storage Account
    Used by various services
        Database backups
        VM disks
    Used for explicit data storage
    Very Cheap

SLA
    Service Level Agreement
        Uptime % of a cloud service
        95% yearly downtime annually = 18days
        99% yearly downtime annually = 52 mins
    Can vary based on the service used and tier
    To get the actual SLA for the system, we multiply the SLAs of all the services
        99.95 x 99.99 = 99.94% = 5hrs

Cost
    Different models
        Per resource
        Per consumption
        Reservation - pay upfront with the commitment of using it for a certain amount of time.
    Always check and look for more cost-effective alternatives.
    Azure Pricing Calculator
        We can get the resources we are interested in and get a cost summary.

Setting a budget
    Cost management
        Can set a budget and get an alert when we get close to a monthly budget

Architects and the Cloud
    Cloud-based systems need to know
        Infrastructure knowledge
        Security
        Hands-on knowledge of the cloud


## AZURE COMPUTE
Cloud services for hosting and running applications
    Uploading your code and running it
Compute is IAAS and PAAS
Four main types of services
    VM
    App services
    AKS
    Azure functions

Virtual Machines
    A virtual server running on a physical server
    Unmanaged service
        Our responsibility (IAAS)
    Architecture
        Host OS - actual microsoft os
        Hypervisor - manages the vs
        Guest os - our OS
            Binaries and Librarues
            Put our own code
        Can have multiple VMs on one host
    How to create a vm
        Select the location
        Select the image
            Os plus pre-installed software
        Select the size
            Cpu and memory

Always check the price

Deploys 5 resources
    The vm
    Network interface
    Virtual network
    Public ip address
    Network security groups

The real cost of a VM
    Includes
        VM, Disk, IP, Storage
        The VM is the highest percentage of the cost
    How to reduce costs
        Auto shutdown
            Shuts down when not needed
            Mainly for test and dev machines
        Reserved Instances
            Upfront payment for a reserved amount of time
            Great for machines that run constantly
            Cannot be refunded
        Spot Instances
            Run on unused capacity in Azure data centres
            Can be evicted at any moment
            Up to 90% discount can vary based on demand
            Good for non-critical tasks and non-continuous tasks
        Disk Optimization
            Select the right disk for the machine
                The default is premium ssd
                Non IO intensive machines can use standard ssd
            Want the CPU to be at 70 or 80% utilization
            Check price in nearby regions

Availability of a VM
    Single instances of SLA depend of the disk
        Pemium SSD - 99.9%
        Standard SSD - 99.5%
    Fault Domain
        Server rack in a data centre
        If there is a problem with the power or something with the rack the servers will go down
    Update Domain
        When VMs undergo maintenance and reboot
    Availability set
        Collection of fault and update domains that your VMs will be spread across
        You can deploy VMs into the same set to ensure they be shut down simultaneously
        It is free, but you pay for the additional VMs
    Availability Zone
        A physically separate zone within an azure region
        Each zone functions as a fault and updates the domain
        Provides protection against a complete zone shutdown
            Better SLA than an availability set
        Can use a load balancer to route between the VMs
        Free but you pay for the additional VMs

ARM Template
    Azure Resource Manager Template
    A JSON file describing the resources
    Used by Azure in all deployments
    Can be exported, modified, uploaded and deployed
    Uses the declarative method for deploying resources

Scale Set
    Group of separate VMs sharing the same image
    Can be scaled out or in
        Add or drop vm’s
    Good for handing unpredictable loads
    Once set up they shouldn’t be modified
    Base the scale set on the final image
    For web apps
        A load balancer should be put in front of the scale set
        We have to tell the client which instance to go to
            Load balancer connects to the scale set and performs the routing to the scale set
        Scale set if free
            Pay for the VMs deployed in it
    Defining the way it scales
        Scaling -> can defining in or out automatically
            Scale based on metric
            Can add a rule to scale
            Percentage cpu

Azure Instance Metadata Services
    Provides a lot of info about the machine
        SKU, storage, networking, scheduled events
    Only accessible from the VM
    With scale set
        Gets notifications about upcoming evictions
        Download postman
