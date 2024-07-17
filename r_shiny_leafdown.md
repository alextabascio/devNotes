# LEAF DOWN PACKAGE OVERVIEW

## Introduction
- Adds drilldown functionality for leaflet chloropleth maps
- Allows the selection of regions/shapes within the map frame
    - drilldown is only executes for the selected region of interest
- Allows communitcation of the maps with other shiny elements (graphs and plots)

## CREATING A DRILLDOWN MAP WITH LEAFDOWN

#### Data
Spatial Polygon Data Frames
- leafdown requires a list of SpatialPolygonsDataFrames
- we can use the getdata from the raster package
- after loading the data we have to create spdfs_list
    - important that the list is ordered such that our "highest" map element
    is the first list element followed by our lower map elements

#### Leafdown Workflow
Initialization
- create a new leafdown object using the new() method
- have to specify
    - spdfs_list: The list containing the spdfs of both map levels.
    - map_output_id: The output_id we specify in our ui via leafletOutput
    - input: The input from the shiny app
    - join_map_levels_by (optional). A named vector with the columns by which the map levels should be joined. In case of two map levels this is set by default to c(“GID_1” = “GID_1”), which is appropriate when ‘Provinces/States’ is the first and ‘Districts’ the second map level. If you use ‘Countries’ as first and ‘Provinces/States’ as second level you have to set it to c("ISO" = "GID_0").
- example
    - my_leafdown = Leafdown$new(spdfs_list, map_output_id = "leafdown", input = input)

#### Data
Adding meta data to the leafdown object.
- using $currdata we retrieve the data of the current map level.
- we can also add columns using left_join
- after creating the new data set we can then pass it to the leafdown object using
$add_data and the retireved using $curr_data
- example
    - metadata = my_leafdown$curr_data
    - new_data <- metadata %>% dplyr::left_join(gdp_2014_federal_states, by = c("NAME_1" = "Federal_State"))

#### Drawing the map
- To draw the map we use the method $draw_leafdown. The specified arguments in the method are internally handed over to the addPolygons function of leaflet
    - Therefore attributes like fillColor or opacity can be specified just as for a usual leaflet map.
- example
    - map = my_leafdown$draw_leafdown(
        fillColor = ~ colorNumeric("Greens", GDP_2014)(GDP_2014)
    )

- we can also add legends and or a basemap as with other leaflet maps

#### Selection
- Internally a leafdown object has an observer for shape_click events. Once a user clicks on a certain region, this region becomes “active” and its boundaries on the map are highlighted. (If the clicked region is already active, it becomes inactive)
- We can retrieve the data of active regions via the $curr_sel_data attribute
- example
    - my_leafdown$curr_sel_data()
- this attribute is a reactiveValue that allows to update graphs and other elements upon a user click

#### Drilldown
- This will update the currently active spdf (my_leafdown$curr_spdf) which then only contains polygons and corresponding metadata for regions whose parents were active in the upper (previous) map level
- example
    - my_leafdown$drill_down()

- The updated data can again be retireved and the columns can be added in the same fashion as before

- example
    - my_leafdown$drill_down()
    - metadata = my_leafdown$curr_data
    - new_data <- metadata %>% 
    dplyr::left_join(gdp_2014_admin_districts, by = c("NAME_2" = "Admin_District"))
    - my_leafdown$add_data(new_data)

- we can then draw the map
    - my_leafdown$draw_leafdown(
        fillColor = ~ colorNumeric("Blues", GDP_2014)(GDP_2014)
    )
- We can use the keep_zoom() method to keep the current zoom level as well as the current view center of the user after the map is drawn.
    - map <- my_leafdown$keep_zoom(map, input)

#### Drillup
- Drill up workflow is the exact same as drill down with the active regions remaining


## CONNECTING GRAPHS TO OUR LEAFDOWN MAP

- Two types of data are needed
    - SpatialPolygonsDataFrames, the shapes or spatial regions used taken from the raster package
    - Census or other data, the data we want to display on the map

- To connect the graphs with the map, we can use the $curr_sel_data() attribute
    - This attribute is a reactiveValue which allows us to update the graphs whenever the user selects a shape on the map or drills a level up or down

- In the server.r we obtain the data using
    - df = my_leafdown$curr_sel_data()

- example
    - output$selectedchart = renderPlotly({
        - get the currently selected data from the map
        df = my_leafdown$curr_sel_data()

        - use an if statement to see if an area is selected selected areas
        - if(nrow(df) > 0){
            - use an internal if statement based on the mapping scale
            - if(my_leafdown$curr_map_level == 1){
                - df = df[, c("state_abbr", "Democrats2016", "Republicans2016", "Libertarians2016", "Green2016")]
                - df = df %>%
                    - pivot_longer(2:5, "party") %>%
                    - group_by(party)
            - } else{
                - df = df[, c("County", "Democrats2016", "Republicans2016", "Libertarians2016", "Green2016")]
                - df = df %>%
                    - pivot_longer(2:5, "party") %>%
                    - group_by(party)
                - df$value = df$value
                - names(df)[1] = "state_abbr"
            - }
        - } else{
            - df <- data.frame(
                - party = c("Democrats2016", "Republicans2016", "Libertarians2016", "Green2016"),
                - state_abbr = "USA",
                - value = c(0.153, 0.634, 0.134, 0.059)
            - ) %>%
                - group_by(party)
        - }

    - create the graph as you would using ggplot and then converting to a plotly 
    - })
