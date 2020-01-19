/* 
 * Licensed under the GPL 2.0
 * Created by O. Echevarria, 
 * 
 */

importPackage(java.lang);
importPackage(java.io);

var wp = new ThemeMaker();

wp.initOutputInput();

wp.gatherInformation();

wp.makeParentDirectory();
wp.makeDirectories();
wp.makeTemplateFiles();
wp.makeStyleSheet();
wp.makeDefaultContent();
wp.makeFileReportStatus();


function ThemeMaker(){

    this.gen_files = new Array('index.php', 'functions.php', 'content.php', 'header.php', 'footer.php', 'front-page.php');
    this.cont_files = new Array('404', 'archive', 'author', 'aside', 'audio', 'gallery', 'image', 'link', 'page', 'quote', 'status', 'single', 'search', 'video');
    this.m_dirs = new Array("css", "images", "inc", "js", "frameworks", "customizer");
    this.m_themeName = "";
    this.m_themeDirectory = "";
    this.br = null;
    this.pw = null;
    this.parentDirectoryObject = null;
    this.filesList = new Array();

    this.makeFileReportStatus = function(){
        
        var i = 0;
        
        this.pw.println("Files Created");
        
        for(i = 0; i < this.filesList.length; i++){
            
            this.pw.println(this.filesList[i]);
            
        }
        
        return ;
        
    };

    this.makeDefaultContent = function(){
        
        var tmpfs = null;
        var tmpfs_cont = "content.php";
        var fileObj = null;

        if(!this.parentDirectoryObject){
            
            return;
            
        }
        
        try{

        tmpfs = new File(this.parentDirectoryObject, tmpfs_cont);

        if(tmpfs.exists()){
            
//            this.pw.println("File created ==> " + tmpfs_cont); 
        
        } 
        
        } catch(e){
            
            this.pw.println(e.toString());
        }
        
        try{
            
        fileObj = new PrintStream(tmpfs);

        fileObj.println("<?php");
        fileObj.println("/** \n" 
+ " * The template part for displaying content \n"
+ " *\n"
+ " * @package WordPress\n"
+ " * @subpackage \n"
+ " * @since \n"
+ " */");
        fileObj.println("");
        fileObj.println("?>");

        fileObj.println("<article id=\"post-<?php the_ID(); ?>\" <?php post_class(); ?>>");        
        fileObj.println("\t<div class=\"entry-content\">");        
        fileObj.println("	<header class=\"entry-header\">");        
        fileObj.println("<?php the_title(); ?>");        
        fileObj.println("	</header><!-- .entry-header -->");        
        fileObj.println("<?php the_content(); ?>");        
        fileObj.println("");        
        fileObj.println("</div>");        
        fileObj.println("<?php edit_post_link(sprintf(__( 'Edit<span class=\"screen-reader-text\"> \"%s\"</span>', 'twentysixteen' ),get_the_title()),'<span class=\"edit-link\">','</span>'); ?>");        
        fileObj.println("</article><!-- #post-<?php the_ID(); ?> -->");        
        
        fileObj.close();
        
        this.filesList[this.filesList.length] = this.parentDirectoryObject + "/" + tmpfs_cont;

        } catch(e){
            
        this.pw.println("Error creating " + this.parentDirectoryObject + "/" +  tmpfs_cont);
            
        }
        
        };

    this.makeStyleSheet = function(){
        
        var tmpfs = null;
        var tmpfs_cont = "style.css";
        var fileObj = null;

        if(!this.parentDirectoryObject){
            
            return;
            
        }

        try{

        tmpfs = new File(this.parentDirectoryObject, tmpfs_cont);
        
        } catch(e){
            
            this.pw.println(e.toString());
        }
        
        try{
            
        fileObj = new PrintStream(tmpfs);
        
        fileObj.println("/** \n" + 
" *  \n" +
" * Theme Name: " + this.m_themeName + "\n" +
" * Theme URI:  \n" +
" * Author:  \n" +
" * Author URI:  \n" +
" * Description:  \n" +
" * Version: 1.0 \n" +
" * Requires at least: 4.4 \n" +
" * Requires PHP: 5.0 \n" +
" * License: GNU General Public License v2 or later \n" +
" * License URI: http://www.gnu.org/licenses/gpl-2.0.html \n" +
" * Tags:  \n" +
" * Text Domain:  \n" +
" *  \n" +
" * This theme, like WordPress, is licensed under the GPL. \n" +
" * Use it to make something cool, have fun, and share what you have learned with others. \n" +
" *  \n" +
" * \n" + 
" **/\n");

        fileObj.close();
        
        this.filesList[this.filesList.length] = this.parentDirectoryObject + "/" + tmpfs_cont;

        } catch(e){
            
        this.pw.println("Error creating " + this.parentDirectoryObject + "/" +  tmpfs_cont);
            
        }
        
    };
    
    this.makeTemplateFiles = function(){
        
        var i = 0;
        var tmpfs = null;
        var tmpfs_cont = null;
        var fileObj = null;
        
        if(!this.parentDirectoryObject){
            
            return;
            
        }
        
        try{

            for(i = 0; i < this.gen_files.length; i++){
                
                tmpfs = new File(this.parentDirectoryObject, this.gen_files[i]);
                tmpfs.createNewFile();
                
                if(tmpfs.exists()){
                    
//                   this.pw.println("File created ==> " + this.parentDirectoryObject + "/" +  this.gen_files[i]); 
                    
                }
                
            }
            
            for(i = 0; i < this.cont_files.length; i++){
                
                tmpfs = new File(this.parentDirectoryObject, this.cont_files[i] + ".php");
                tmpfs.createNewFile();
                
                fileObj = new PrintStream(tmpfs);

                fileObj.println("");
                fileObj.println("<?php get_header(); ?>");
                fileObj.println("");
                fileObj.println("<?php if(have_posts()): ?>");
                fileObj.println("");
                fileObj.println("<?php while(have_posts()): the_post();");
                fileObj.println("");
                fileObj.println("<?php get_template_part('content', " + this.cont_files[i] + "); ?>");
                fileObj.println("");
                fileObj.println("<?php endwhile; ?>");
                fileObj.println("");
                fileObj.println("<?php endif; ?>");
                fileObj.println("");
                fileObj.println("<?php get_footer(); ?>");
                fileObj.println("");

                fileObj.close();
                
                this.filesList[this.filesList.length] = this.parentDirectoryObject + "/" + this.cont_files[i] + ".php";

                if(tmpfs.exists()){
                    
//                   this.pw.println("File created ==> " + this.parentDirectoryObject + "/" + this.cont_files[i] + ".php"); 
                    
                }
                
                tmpfs_cont = new File(this.parentDirectoryObject, "content-" + this.cont_files[i] + ".php");
                tmpfs_cont.createNewFile();

                if(tmpfs_cont.exists()){
                    
//                    this.pw.println("File created ==> " + this.parentDirectoryObject + "/" + "content-" + this.cont_files[i] + ".php");
                    
                }
                
                fileObj = new PrintStream(tmpfs_cont);
                
                fileObj.println("");
                fileObj.println("<h1 class = \"content-title\"><?php the_title(); ?>");
                fileObj.println("<?php the_content(); ?>");
                fileObj.println("<?php edit_post_link( __( 'Edit Content', 'textdomain' ), '<p>', '</p>', null, 'btn btn-primary btn-edit-post-link' ); ?>");
                fileObj.println("");
                
                fileObj.close();
                
                this.filesList[this.filesList.length] = this.parentDirectoryObject + "/" + "content-" + this.cont_files[i] + ".php";
                
            }
        
        } catch(e){
            
            this.pw.println("Error creating file " + e.toString());
            
        }
        
    };

    this.initOutputInput = function(){
        
        var isr = new InputStreamReader(System.in);

        this.pw = new PrintStream(System.out);
        this.br = new BufferedReader(isr);
        
    };

    this.gatherInformation = function(){

        this.pw.print("Enter Theme Name ==> ");
        this.m_themeName = this.br.readLine();

        this.pw.print("Enter directory name: ==> ");
        this.m_themeDirectory = this.br.readLine();
        
    };

    this.makeParentDirectory = function(){
    
    var tmpfs = null;
    
    tmpfs = new File(this.m_themeDirectory);
    
    try{
        
        if(tmpfs.mkdir()){
            
        this.parentDirectoryObject = tmpfs;

        this.pw.println("Parent directory " + this.m_themeDirectory + " created");
            
        }

    } catch(e){
        
        this.pw.println("Parent directory not created: " + e.toString());
        
    }
        
    };

    this.setBufferedInputReader = function(){

        var isr = null;
        
        if(this.br == null){
            
            isr = InputStreamReader(System.in);
            this.br = new BufferedReader(isr);
            
        }
        
    };


    this.makeDirectories = function(){
        
    var i = 0;
    var obj = null;
    var pw = new PrintStream(System.out);
    
        for(i = 0; i < this.m_dirs.length; i++){
        
            try{
        
            obj = new File(this.parentDirectoryObject, this.m_dirs[i]);
            
            obj.mkdir();
            
            if(obj.isDirectory()){
                
                pw.println("Directory Created ==> " + this.parentDirectoryObject + "/" + this.m_dirs[i]);
                
            } else {
                
                pw.println("Directory Not Created ==> " + this.parentDirectoryObject + "/" + this.m_dirs[i]);
                
            }
        
            } catch(e){
                
            pw.println(e.toString());
        
            }    
        
        }
        
    };
    
}