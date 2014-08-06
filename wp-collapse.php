<?php
/*
  Plugin Name: WP Collapse
  Plugin URI: #
  Description: 
  Author: Daniel Olson
  Author URI: #
  Version: 0.1
  License: GPLv2 or later
  License URI: http://www.gnu.org/licenses/gpl-2.0.html

  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
*/

if (!class_exists('wp_collapse')) {

  class wp_collapse {
    
  function __construct() {
    
    function acs_scripts(){
         global $pagenow;

          if(isset($_GET['post_type']) ) {          
            $post_type = $_GET['post_type'];
            if(is_post_type_hierarchical($post_type)) {
              add_filter( 'admin_body_class', 'acs_admin_body_class' );
            }

            function acs_admin_body_class( $classes )
            {
                $classes .= ' ' .'acs-hier';
                return $classes;
            }

          }
          
          if ( is_admin() && isset($_GET['post_type']) && $pagenow =='edit.php' ) {
            
              //make sure jquery is loaded
              wp_enqueue_script('jquery');
              
              //main collapse pages script
              wp_enqueue_script('acs-js',plugins_url('js/scripts.min.js', __FILE__ ), false, '2.0');
            
              //Load Styles
              wp_enqueue_style('acs-css', plugins_url('css/style.min.css', __FILE__ ), false, '2.0', 'screen');
              }
          }
         add_action('admin_enqueue_scripts','acs_scripts');
      }
  }
  
  global $collapsePages;
  $collapsePages = new wp_collapse();
}

?>