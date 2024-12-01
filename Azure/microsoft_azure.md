# MICROSOFT AZURE NOTES

## BASIC CONCEPTS

#### Regions
- Every resource will get placed in a region
- How to select a region
    - Geographical proximity to the system’s audience
    - Service Availability
    - Availability zones
    - Pricing

#### Resource Groups
- Used for grouping resources by a logic boundary
- Free
    - Can create as many as you want
- Examples of resource groups
    - Development / Test / Production resources
    - Team A vs Team B
- Resource Groups vs Subscriptions
    - Subscriptions
        - Have associated accounts (Account level)
        - Cost centre
    - RGs
        - Containers for the resources themselves
- Naming conventions
    - Have “rg” as a prefix
    - RG-Development

#### Storage Account
- Used by various services
    - Database backups
    - VM disks
- Used for explicit data storage
- Very Cheap

#### SLA
- Service Level Agreement
    - Uptime % of a cloud service
    - 95% yearly downtime annually = 18days
    - 99% yearly downtime annually = 52 mins
- Can vary based on the service used and tier
- To get the actual SLA for the system, we multiply the SLAs of all the services
    - 99.95 x 99.99 = 99.94% = 5hrs

#### Cost
- Different models
    - Per resource
    - Per consumption
    - Reservation - pay upfront with the commitment of using it for a certain amount of time.
- Always check and look for more cost-effective alternatives.
- Azure Pricing Calculator
    - We can get the resources we are interested in and get a cost summary.

#### Setting a budget
- Cost management
    - Can set a budget and get an alert when we get close to a monthly budget

#### Architects and the Cloud
- Cloud-based systems need to know
    - Infrastructure knowledge
    - Security
    - Hands-on knowledge of the cloud


## AZURE COMPUTE
- Cloud services for hosting and running applications
    - Uploading your code and running it
- Compute is IAAS and PAAS
- Four main types of services
    - VM
    - App services
    - AKS
    - Azure functions

#### Virtual Machines
- A virtual server running on a physical server
- Unmanaged service
    - Our responsibility (IAAS)
- Architecture
    - Host OS - actual microsoft os
    - Hypervisor - manages the vs
    - Guest os - our OS
        - Binaries and Librarues
        - Put our own code
    - Can have multiple VMs on one host
- How to create a vm
    - Select the location
    - Select the image
        - Os plus pre-installed software
    - Select the size
        - Cpu and memory

- Always check the price

- Deploys 5 resources
    - The vm
    - Network interface
    - Virtual network
    - Public ip address
    - Network security groups

- The real cost of a VM
    - Includes
        - VM, Disk, IP, Storage
        - The VM is the highest percentage of the cost
    - How to reduce costs
        - Auto shutdown
            - Shuts down when not needed
            - Mainly for test and dev machines
        - Reserved Instances
            - Upfront payment for a reserved amount of time
            - Great for machines that run constantly
            - Cannot be refunded
        - Spot Instances
            Run on unused capacity in Azure data centres
            Can be evicted at any moment
            Up to 90% discount can vary based on demand
            Good for non-critical tasks and non-continuous tasks
        - Disk Optimization
            - Select the right disk for the machine
                - The default is premium ssd
                - Non IO intensive machines can use standard ssd
            - Want the CPU to be at 70 or 80% utilization
            - Check price in nearby regions

#### Availability of a VM
- Single instances of SLA depend of the disk
    - Pemium SSD - 99.9%
    - Standard SSD - 99.5%
- Fault Domain
    - Server rack in a data centre
    - If there is a problem with the power or something with the rack the servers will go down
- Update Domain
    - When VMs undergo maintenance and reboot
- Availability set
    - Collection of fault and update domains that your VMs will be spread across
    - You can deploy VMs into the same set to ensure they be shut down simultaneously
    - It is free, but you pay for the additional VMs
- Availability Zone
    - A physically separate zone within an azure region
    - Each zone functions as a fault and updates the domain
    - Provides protection against a complete zone shutdown
        - Better SLA than an availability set
    - Can use a load balancer to route between the VMs
    - Free but you pay for the additional VMs

#### ARM Template
- Azure Resource Manager Template
- A JSON file describing the resources
- Used by Azure in all deployments
- Can be exported, modified, uploaded and deployed
- Uses the declarative method for deploying resources

#### Scale Set
- Group of separate VMs sharing the same image
- Can be scaled out or in
    - Add or drop vm’s
- Good for handing unpredictable loads
    - Once set up they shouldn’t be modified
    - Base the scale set on the final image
    - For web apps
    - A load balancer should be put in front of the scale set
    - We have to tell the client which instance to go to
        - Load balancer connects to the scale set and performs the routing to the scale set
    - Scale set if free
        - Pay for the VMs deployed in it
- Defining the way it scales
    - Scaling -> can defining in or out automatically
        - Scale based on metric
        - Can add a rule to scale
        - Percentage cpu

- Azure Instance Metadata Services
    - Provides a lot of info about the machine
        - SKU, storage, networking, scheduled events
    - Only accessible from the VM
    - With scale set
        - Gets notifications about upcoming evictions
        - Download postman


#### Deploying App the Azure using a VM

- etup the app catalog
    - Set up a folder that will be copied to the virtual machine
    - set up a resource group and VM that will contain all components used by the app

- Configure the VM to run the app via the server manager
    - configure the VM to operate as a web server

- Need to setup a hosting bundle for dotnet6 applications
    - dotnet.microsoft.com/en-us/download/dotnet/6.0
    - download the hosting bundle

- Now we can setup the catalogue app
    - Prepare a folder, copy and paste to files from the local folder to the virtual machine folder
    - Configure the webserver on the VM in IIS
    - Need to explicitly also access for external networks to the virtual machine. Will be explained in the Network section






## Data in Azure

- Provides cloud services for data solutions that are fully managed

- Can be part of the azure app or completely idenpendent

- Major Features (what to look for)
    - Security
        - Encryption
    - Data Backup and Retention Period
    - Availability

- Databases on VM
    - have the option to set up a VM with database software
    - Pros of using on a VM
        - full flexibility to setup and configure anyway you want
    - Cons on VM
        - You have to take care of everything
            - SLA
            - Updates
            - Security
            - Backup
            - etc.

#### Azure SQL
- Managed SQL Server on Azure
- Fully managed DB
- Offers flexible pricing

- Types of DBs
    - Azure SQL
        - Single DB on a single server
        - Offers lots of backup and security options
        - Can be set up for provisioned or serverless tiers
            - serverless might make sense for cui
    - Elastic Pool
        - Store multiple DBs on a single server
        - Good for low-utilization and frequent spikes
        - Very cost effective
            - As long as the server can support the resources you need
    - Managed Instance
        - closer to an on-premises SQL server

- Which one to choose
    - Are you migrating an on-prem SQL -> Managed Instance
    - Do you need multiple mostly low-utilization DBs -> Elastic Pool
    - All other cases -> Azure SQL

- Creating and Connecting to Azure SQL Database
    - Create SQL database for your needs
    - Find how to connect to SQL server from R studio
        - Probably need to install a specific package

- Connecting an App to Azure SQL
    - modify the startup.js file
    - add the connection string to the appsetting.json and - add your DB password
    - install the dotnet ef tool and dotnet ef migration
    - deploy to the cloud through the VM you are running your app on
        - add all the updated files to the app restart the application
    - Have to add the catalog vm ip address to the firewall rules in the DB

- Securing the DB connection with a private endpoint
    - want the connection to go through a private ip rather than a public ip and firewall rule
    - setup a private endpoint for where the vm is located
    - we access the DB with the same url when we connected to the VM

- In app services you can configure the connection string to the DB within the Azure portal, and then secure the connection through vnet integration, on the app service side, and private endpoint, on the server side

- reminder:
    copy the SQL connection string to the Resources Helper List

#### Cosmos DB
- Fully managed no SQL database
- amazing preformance
- fully automatic management
- Contains multiple APIs
    - SQL, Mongo, etc.

- Cosmos is a heirarchical DB
    - items can have its own structure
    - dealing with containers and items rather than tables, allowing each item to have their own structure

- has similar backup and security

- Cosmos DB Partitions
    - Data items are divided into partitions
        - logical group of items based on a property
        - i.e. in a database of different cars, the brand can be the partition property
    - this is the base scale unit in cosmos db
        - when we scale up or down we either add or remove partitions
    - make sure items are divided as evenly as possible and to select the right partition
        - these properties can't be modified

#### SQL vs NOSQL

- SQL are relational databases
    - store the data in table
    - tables have concrete set of columns and can have relations with other tables

- SQL databases have transactions
- Querying is very refined in SQL

- No SQL
    - better for preformance and size
    - Schema Less
        - can store different entities with different fields within the same table as they are usually stored in JSON format

- have eventual consistency rather than transactions

#### Cosmos DB Cont'd

- Consistency Level
    - Realtional DB
        - Strong consistency (high availability, high latency)
    - No SQL
        - eventual consistency (low availability, low latency)
    
    Basic questions
        - if region x updates an item and region y read this item, what version does it get?
    
    - 5 levels
        - Strong (similar to SQL database)
            - region y gets the last version updated in region x
            - no different versions of the data
        - bounded
            - region y will lag behind region x by t time
            - keeps the order of the versions
        - session
            - strong consistency in a client session
            - other clients will get a consistent prefix
        - consistent prefix
            - keeps the order of the versions but no garuntee of the lag size
            - used for low write larency and infrequent reads
        - eventual
            - no garuntee of order and lag size
            - i.e. count of Retweets, Likes, etc. where it's okay if the count fluctuates

- configured at the account level


- Pricing
    - Request Units / second
    - 1 RU = Reading item of size 1KB in 1 second
        - Update, delete, insert and query will is more than 1 RU
    - Pricing based off
        - database operations type
        - write regions
        - No. of provisioned RU/s







        


